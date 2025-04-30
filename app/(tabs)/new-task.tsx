import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Input } from '../../components';
import { useForm } from '../../libs/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskSchema, TaskFormData } from '../../types/task';
import api from '../../services/api';

export default function NewTask() {
  const queryClient = useQueryClient();

  const { control, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const createMutation = useMutation({
    mutationFn: async (data: TaskFormData) => {
      const response = await api.post('/tasks', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      router.back();
    },
  });

  const onSubmit = (data: TaskFormData) => {
    createMutation.mutate(data);
  };

  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Nova Tarefa</Text>

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
        <Text style={styles.buttonText}>Criar Tarefa</Text>
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