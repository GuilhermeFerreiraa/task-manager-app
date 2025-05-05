import { router } from 'expo-router';

import { queryClient, useMutation } from '@/libs/reactQuery';
import { useGetTaskById } from '@/services/task';

import { api } from '@/services/api';

export const useTask = (id: string) => {
  const { data: task } = useGetTaskById(id);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      router.back();
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return {
    task,
    handleDelete,
  };
};
