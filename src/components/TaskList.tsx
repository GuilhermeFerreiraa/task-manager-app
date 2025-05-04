import { FlatList, Text, StyleSheet } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useRef, useState, useCallback, useEffect } from 'react';

import { TaskResponseType } from '@/types/models/task';

import { Box } from './Box';
import { TaskDetailSheet } from './TaskDetailSheet/TaskDetailSheet';
import { TaskListItem } from './TaskListItem';

interface TaskListProps {
  tasks: TaskResponseType[] | undefined;
  isLoading: boolean;
  onDeleteTask: (taskId: string) => void;
}

export const TaskList = ({ tasks, isLoading, onDeleteTask }: TaskListProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedTask, setSelectedTask] = useState<TaskResponseType | null>(null);

  const handlePresentModal = useCallback((task: TaskResponseType) => {
    setSelectedTask(task);
  }, []);

  useEffect(() => {
    if (selectedTask) {
      bottomSheetModalRef.current?.present();
    }
  }, [selectedTask]);

  const renderItem = useCallback(
    ({ item }: { item: TaskResponseType }) => (
      <TaskListItem
        task={item}
        onDelete={onDeleteTask}
        onPressItem={handlePresentModal}
      />
    ),
    [onDeleteTask, handlePresentModal],
  );

  if (isLoading) {
    return (
      <Box style={styles.centeredContainer}>
        <Text>Carregando...</Text>
      </Box>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Box style={styles.centeredContainer}>
        <Text>Nenhuma tarefa encontrada.</Text>
      </Box>
    );
  }

  return (
    <Box style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
    paddingBottom: 20,
  },
});
