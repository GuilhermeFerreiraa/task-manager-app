import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Link } from 'expo-router';

import { Box, TaskList } from '@/components';
import { useAuthStore } from '@/src/store/auth';

import { useDashboard } from '@/hooks/tabs/useDashboard';

export default function TasksScreen() {
  const { tasks, isLoading, handleDeleteTask, refetch } = useDashboard();
  const user = useAuthStore((state) => state.user);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Box style={styles.container}>
        <Box style={styles.header}>
          <Text style={styles.title}>{`Olá, ${user?.name}!`}</Text>
          <Link href="/(tabs)/new-task" asChild>
            <TouchableOpacity style={styles.addButton} accessibilityRole="button">
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </Link>
        </Box>
        <Text style={styles.subtitle}>Minhas Tarefas</Text>

        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onDeleteTask={handleDeleteTask}
          onRefresh={refetch}
        />
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'medium',
    paddingBottom: 4,
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
