import { useState } from 'react';

import { router, useLocalSearchParams } from 'expo-router';

import { customParseFormat, dayjs } from '@/libs/dayjs';
import { useForm } from '@/libs/reactHookForm';
import { zodResolver, type z } from '@/libs/zod';

import { useGetTaskById } from '@/services/task';
import { useUpdateTask } from '@/services/task/useUpdateTask/useUpdateTask';

import { showError, showSuccess } from '@/utils/toast';

import type { PriorityType } from '@/types/enums/Priority';
import type { StatusSchema } from '@/types/enums/Status';
import { editTaskSchema } from '@/types/models/task';

type EditTaskFormData = z.infer<typeof editTaskSchema>;

dayjs.extend(customParseFormat);

export const useEditTask = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [selectedPriority, setSelectedPriority] = useState<PriorityType | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<StatusSchema | undefined>();

  const { mutate: onUpdateTask, isPending: isUpdatingTask } = useUpdateTask();

  const {
    data: task,
    isLoading: isLoadingTask,
    isError: isTaskError,
    error: taskError,
  } = useGetTaskById(id);

  if (isTaskError) {
    console.error('--- EditTaskScreen Query Error ---', taskError);
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditTaskFormData>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      due_date: '',
    },
  });

  const onSubmit = (formData: EditTaskFormData) => {
    if (!id) return;

    let formattedDueDate: string | undefined;
    if (
      formData.due_date &&
      typeof formData.due_date === 'string' &&
      formData.due_date.trim() !== ''
    ) {
      const parsedDate = dayjs(formData.due_date, 'DD/MM/YYYY', true);

      if (parsedDate.isValid()) {
        const today = dayjs().startOf('day');
        const isAfterToday = parsedDate.isAfter(today);

        if (!isAfterToday) {
          showError('A data de vencimento deve ser uma data futura.');
          return;
        }

        formattedDueDate = parsedDate.format('YYYY-MM-DD');
      } else {
        showError('Formato de data inválido. Use DD/MM/AAAA.');
        return;
      }
    }

    const finalData = {
      title: formData.title,
      description: formData.description || undefined,
      due_date: formattedDueDate,
      priority: selectedPriority,
      status: selectedStatus,
    };

    Object.keys(finalData).forEach((key) => {
      const typedKey = key as keyof typeof finalData;
      if (finalData[typedKey] === undefined) {
        delete finalData[typedKey];
      }
    });

    onUpdateTask(
      {
        id: Number(id),
        payload: finalData,
      },
      {
        onSuccess: () => {
          showSuccess('Tarefa atualizada com sucesso!');
          router.back();
        },
        onError: (error: any) => {
          let detailedMessage = 'Erro ao atualizar tarefa.';

          if (error.response) {
            const message = error.response.data?.message || 'Erro desconhecido';
            const validationErrors = error.response.data?.errors;
            detailedMessage = message;

            if (validationErrors && typeof validationErrors === 'object') {
              const firstErrorField = Object.keys(validationErrors)[0];
              if (
                firstErrorField &&
                Array.isArray(validationErrors[firstErrorField]) &&
                validationErrors[firstErrorField].length > 0
              ) {
                detailedMessage += ` (${validationErrors[firstErrorField][0]})`;
              }
            }
          } else {
            detailedMessage = error.message || detailedMessage;
          }

          showError(detailedMessage);
        },
      },
    );
  };

  return {
    control,
    handleSubmit,
    reset,
    errors,
    onSubmit,
    isUpdatingTask,
    isLoadingTask,
    isTaskError,
    taskError,
    task,
    setSelectedPriority,
    setSelectedStatus,
    selectedPriority,
    selectedStatus,
  };
};
