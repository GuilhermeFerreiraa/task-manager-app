import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Box } from '../../../components';
import { Task } from '../../../types/task';
import api from '../../../services/api';

export default function TaskDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: task } = useQuery<Task>({
    queryKey: ['task', id],
    queryFn: async () => {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    },
  });

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

  if (!task) {
    return (
      <Box style={styles.container}>
        <Text>Carregando...</Text>
      </Box>
    );
  }

  return (
    <Box style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      {task.description && (
        <Text style={styles.description}>{task.description}</Text>
      )}
      <Text style={styles.status}>
        Status: {task.completed ? 'Concluída' : 'Pendente'}
      </Text>
      <Text style={styles.date}>
        Criada em: {new Date(task.created_at).toLocaleDateString()}
      </Text>
      <Text style={styles.date}>
        Atualizada em: {new Date(task.updated_at).toLocaleDateString()}
      </Text>

      <Box style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => router.push(`/(tabs)/edit-task/${id}`)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 