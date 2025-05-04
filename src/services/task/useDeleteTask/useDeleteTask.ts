import { queryClient, useMutation } from '@/libs/reactQuery';

import { api } from '../../api';
import { paths } from '../../paths';
import { queryKeys } from '../../queryKeys';

export const deleteTask = async (id: string) => {
  const { data } = await api.delete(`${paths.v1}${paths.tasks}/${id}`);

  return data;
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks,
      });
    },
  });
};
