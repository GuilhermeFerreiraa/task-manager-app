import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Box } from '../../components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Task } from '../../types/task';
import api from '../../services/api';

export default function Tasks() {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/tasks');
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId: string) => {
      await api.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleDeleteTask = (taskId: string) => {
    deleteMutation.mutate(taskId);
  };

  if (isLoading) {
    return (
      <Box style={styles.container}>
        <Text>Carregando...</Text>
      </Box>
    );
  }

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        <Text style={styles.title}>Minhas Tarefas</Text>
        <Link href="/(tabs)/new-task" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </Link>
      </Box>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Box style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            {item.description && (
              <Text style={styles.taskDescription}>{item.description}</Text>
            )}
            <Box style={styles.taskActions}>
              <Link href={`/(tabs)/edit-task/${item.id}`} asChild>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteTask(item.id)}
              >
                <Text style={styles.actionButtonText}>Excluir</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
