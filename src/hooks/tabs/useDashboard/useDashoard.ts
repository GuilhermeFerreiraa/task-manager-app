import { useListTask } from '@/src/services/task';

import { useDeleteTask } from '@/services/task/useDeleteTask';

import { showError, showSuccess } from '@/utils/toast';

export const useDashboard = () => {
  const { mutate: onDeleteTaskMutate } = useDeleteTask();

  const { data: tasks, isLoading, isError, error } = useListTask();

  if (isError) {
    console.error('--- TasksScreen Error Object ---', error);
  }

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

  return {
    tasks,
    isLoading,
    isError,
    error,
    handleDeleteTask,
    onDeleteTaskMutate,
  };
};
