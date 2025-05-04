import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { router } from 'expo-router';

import { queryClient } from '@/src/libs/reactQuery';
import { showError, showSuccess } from '@/src/libs/toast';
import { queryKeys } from '@/src/services/queryKeys';
import { useCreateTask } from '@/src/services/task/useCreateTask/useCreateTask';
import { prioritySchemaEnum, PriorityType } from '@/src/types/enums/Priority';
import { statusSchemaEnum } from '@/src/types/enums/Status';
import { TaskFormDataType, taskSchema } from '@/src/types/models/task';
import { formatDate } from '@/src/utils/formatDate';

export const useNewTask = () => {
  const [selectedId, setSelectedId] = useState<PriorityType>(prioritySchemaEnum.LOW);

  const { mutate: onCreateTask } = useCreateTask();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormDataType>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormDataType) => {
    onCreateTask(
      {
        title: data.title,
        description: data.description,
        due_date: formatDate(data.due_date || ''),
        priority: selectedId,
        status: statusSchemaEnum.PENDING,
      },
      {
        onSuccess: () => {
          showSuccess('Tarefa criada com sucesso');
          router.push('/(tabs)');
          queryClient.invalidateQueries({
            queryKey: queryKeys.tasks,
          });
        },
        onError: () => {
          showError('Erro ao criar tarefa');
        },
      },
    );
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    selectedId,
    setSelectedId,
    onCreateTask,
  };
};
