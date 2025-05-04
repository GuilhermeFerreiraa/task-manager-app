import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/libs/reactQuery';
import {
  TaskFormDataType,
  taskResponseSchema,
  TaskResponseType,
} from '@/src/types/models/task';

import { api } from '@/services/api';

import { paths } from '../../paths';
import { queryKeys } from '../../queryKeys';
import { responseSchema, Response } from '../../types';

const TaskResponseSchema = responseSchema(taskResponseSchema);

const postTask = async (task: TaskFormDataType): Promise<TaskResponseType> => {
  const { data } = await api.post<Response<typeof taskResponseSchema>>(
    `${paths.v1}${paths.tasks}`,
    task,
  );

  const result = TaskResponseSchema.safeParse(data);

  if (!result.success) {
    console.error('Unable to parse task response', result.error.message);
  }

  return data.data;
};

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (task: TaskFormDataType) => postTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks,
      });
    },
  });
};
