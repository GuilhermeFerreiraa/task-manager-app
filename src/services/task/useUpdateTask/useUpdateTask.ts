import { queryClient, useMutation } from '@/libs/reactQuery';

import { api } from '@/services/api';
import { queryKeys } from '@/services/queryKeys';

import type { TaskFormDataType } from '@/types/models/task';

import { paths } from '../../paths';

type UpdateTaskPayload = {
  id: number;
  payload: Partial<TaskFormDataType>;
};

const updateTask = async ({ id, payload }: UpdateTaskPayload) => {
  const { data } = await api.put(`${paths.v1}${paths.tasks}/${id}`, payload);
  return data.data;
};

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks,
      });
    },
  });
};
