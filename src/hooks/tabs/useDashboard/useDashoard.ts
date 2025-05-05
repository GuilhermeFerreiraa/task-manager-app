import { useListTask } from '@/services/task';

import { useDeleteTask } from '@/services/task/useDeleteTask';

import { showError, showSuccess } from '@/utils/toast';

import { TaskResponseType } from '@/types/models/task';

export const useDashboard = () => {
  const { mutate: onDeleteTaskMutate } = useDeleteTask();

  const { data: tasks, isLoading, isError, error, refetch } = useListTask();

  const handleDeleteTask = (taskId: string) => {
    onDeleteTaskMutate(taskId, {
      onSuccess: () => {
        showSuccess('Tarefa excluída com sucesso!');
      },
      onError: () => {
        showError('Erro ao excluir tarefa');
      },
    });
  };

  const handleRefresh = async (): Promise<TaskResponseType[]> => {
    const result = await refetch();
    return result.data || [];
  };

  return {
    tasks,
    isLoading,
    isError,
    error,
    handleDeleteTask,
    onDeleteTaskMutate,
    refetch: handleRefresh
  };
};
