import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';

import { Box } from '@/components';

import { useTask } from '@/hooks/tabs/useTask';

import { statusSchemaEnum } from '@/types/enums/Status';

export default function TaskDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { handleDelete, task } = useTask(id);

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
      {task.description && <Text style={styles.description}>{task.description}</Text>}
      <Text style={styles.status}>
        Status: {task.status === statusSchemaEnum.COMPLETED ? 'Concluída' : 'Pendente'}
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
          onPress={() => router.push({ pathname: '/edit-task/[id]', params: { id } })}
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
