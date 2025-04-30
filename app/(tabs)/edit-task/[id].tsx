import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Input } from '../../../components';
import { useForm } from '../../../libs/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskSchema, TaskFormData, Task } from '../../../types/task';
import api from '../../../services/api';

export default function EditTask() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: task } = useQuery<Task>({
    queryKey: ['task', id],
    queryFn: async () => {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    },
  });

  const { control, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: 'pending',
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: TaskFormData) => {
      const response = await api.put(`/tasks/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      router.back();
    },
  });

  const onSubmit = (data: TaskFormData) => {
    updateMutation.mutate(data);
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
      <Text style={styles.title}>Editar Tarefa</Text>

      <Input
        name="title"
        control={control}
        label="Título"
        error={errors.title?.message}
        placeholder="Título"
      />

      <Input
        name="description"
        control={control}
        label="Descrição"
        error={errors.description?.message}
        placeholder="Descrição"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 