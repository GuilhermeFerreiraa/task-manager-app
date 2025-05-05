import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/libs/reactQuery';

import { api } from '@/services/api';

import {
  TaskFormDataType,
  taskResponseSchema,
  TaskResponseType,
} from '@/types/models/task';

import { paths } from '../../paths';
import { queryKeys } from '../../queryKeys';
import { Response, responseSchema } from '../../types';

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
        queryKey: [queryKeys.tasks],
        exact: false,
        refetchType: 'all',
      });

      queryClient.refetchQueries({
        queryKey: [queryKeys.tasks],
        exact: false,
        type: 'all',
      });
    },
  });
};
