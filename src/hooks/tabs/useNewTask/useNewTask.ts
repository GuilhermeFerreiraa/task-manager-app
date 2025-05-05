import { useState } from 'react';

import { router } from 'expo-router';

import { customParseFormat, dayjs } from '@/libs/dayjs';
import { useForm } from '@/libs/reactHookForm';
import { queryClient } from '@/libs/reactQuery';
import { showError, showSuccess } from '@/libs/toast';
import { zodResolver } from '@/libs/zod';

import { queryKeys } from '@/services/queryKeys';
import { useListTask } from '@/services/task';
import { useCreateTask } from '@/services/task/useCreateTask/useCreateTask';

import { prioritySchemaEnum, PriorityType } from '@/types/enums/Priority';
import { statusSchemaEnum } from '@/types/enums/Status';
import { TaskFormDataType, taskSchema } from '@/types/models/task';

dayjs.extend(customParseFormat);

export const useNewTask = () => {
  const [selectedId, setSelectedId] = useState<PriorityType>(prioritySchemaEnum.LOW);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: onCreateTask, isPending } = useCreateTask();

  const { refetch: refetchTasks } = useListTask({ enabled: false });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormDataType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      due_date: '',
    },
  });

  const onSubmit = (data: TaskFormDataType) => {
    let formattedDueDate = undefined;

    if (data.due_date && data.due_date.trim() !== '') {
      const parsedDate = dayjs(data.due_date, 'DD/MM/YYYY', true);

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

    setIsSubmitting(true);

    onCreateTask(
      {
        title: data.title,
        description: data.description,
        due_date: formattedDueDate,
        priority: selectedId,
        status: statusSchemaEnum.PENDING,
      },
      {
        onSuccess: () => {
          reset({
            title: '',
            description: '',
            due_date: '',
          });
          setSelectedId(prioritySchemaEnum.LOW);

          queryClient.invalidateQueries({
            queryKey: [queryKeys.tasks],
          });

          refetchTasks().then(() => {
            setIsSubmitting(false);
            showSuccess('Tarefa criada com sucesso');
            router.push('/(tabs)');
          });
        },
        onError: (error) => {
          setIsSubmitting(false);
          console.error('Erro ao criar tarefa:', error);
          showError('Erro ao criar tarefa. Verifique os dados e tente novamente.');
        },
      },
    );
  };

  const isLoading = isPending || isSubmitting;

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    selectedId,
    setSelectedId,
    onCreateTask,
    reset,
    isLoading,
  };
};
