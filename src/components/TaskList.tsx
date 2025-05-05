import { FlatList, RefreshControl, StyleSheet, Text } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, useState } from 'react';

import { TaskResponseType } from '@/types/models/task';

import { Box } from './Box';
import { TaskDetailSheet } from './TaskDetailSheet/TaskDetailSheet';
import { TaskListItem } from './TaskListItem';

interface TaskListProps {
  tasks: TaskResponseType[] | undefined;
  isLoading: boolean;
  onDeleteTask: (taskId: string) => void;
  onRefresh: () => Promise<TaskResponseType[]>;
}

export const TaskList = ({
  tasks,
  isLoading,
  onDeleteTask,
  onRefresh,
}: TaskListProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedTask, setSelectedTask] = useState<TaskResponseType | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [localTasks, setLocalTasks] = useState<TaskResponseType[] | undefined>(tasks);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  }, [onRefresh]);

  const handlePresentModal = useCallback((task: TaskResponseType) => {
    setSelectedTask(task);
  }, []);

  useEffect(() => {
    if (selectedTask) {
      bottomSheetModalRef.current?.present();
    }
  }, [selectedTask]);

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (localTasks) {
        setLocalTasks(localTasks.filter((task) => task.id.toString() !== taskId));
      }

      if (selectedTask && selectedTask.id.toString() === taskId) {
        bottomSheetModalRef.current?.dismiss();
        setSelectedTask(null);
      }

      onDeleteTask(taskId);
    },
    [localTasks, onDeleteTask, selectedTask],
  );

  const renderItem = useCallback(
    ({ item }: { item: TaskResponseType }) => (
      <TaskListItem
        task={item}
        onDelete={handleDeleteTask}
        onPressItem={handlePresentModal}
      />
    ),
    [handleDeleteTask, handlePresentModal],
  );

  if (isLoading) {
    return (
      <Box style={styles.centeredContainer}>
        <Text>Carregando...</Text>
      </Box>
    );
  }

  if (!localTasks || localTasks.length === 0) {
    return (
      <Box style={styles.centeredContainer}>
        <Text>Nenhuma tarefa encontrada.</Text>
      </Box>
    );
  }

  return (
    <Box style={styles.container}>
      <FlatList
        data={localTasks}
        bouncesZoom={false}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        extraData={localTasks}
      />
      <TaskDetailSheet
        ref={bottomSheetModalRef}
        task={selectedTask}
        onDismiss={() => setSelectedTask(null)}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 2,
    gap: 12,
    marginTop: 20,
    paddingBottom: 20,
  },
});
