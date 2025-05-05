import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Input, SelectButton } from '@/components';

import { useEditTask } from '@/hooks/tabs/useEditTask';

import { priorities, statuses } from '@/utils/options';

import { prioritySchemaEnum, type PriorityType } from '@/types/enums/Priority';
import { StatusSchema, statusSchemaEnum } from '@/types/enums/Status';

export default function EditTaskScreen() {
  const {
    control,
    handleSubmit,
    reset,
    isLoadingTask,
    isUpdatingTask,
    onSubmit,
    setSelectedPriority,
    setSelectedStatus,
    isTaskError,
    taskError,
    task,
    selectedPriority,
    selectedStatus,
  } = useEditTask();

  useEffect(() => {
    if (task) {
      let formattedDate = '';
      if (task.due_date) {
        const datePart = task.due_date.split('T')[0];
        const [year, month, day] = datePart.split('-');
        formattedDate = `${day}/${month}/${year}`;
      }

      reset({
        title: task.title,
        description: task.description || '',
        due_date: formattedDate,
      });
      setSelectedPriority(
        task.priority
          ? (task.priority.toUpperCase() as PriorityType)
          : prioritySchemaEnum.LOW,
      );
      setSelectedStatus(
        task.status
          ? (task.status.toUpperCase() as StatusSchema)
          : statusSchemaEnum.PENDING,
      );
    }
  }, [task, reset]);

  if (isLoadingTask) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Box style={styles.container}>
          <Text>Carregando...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  if (isTaskError) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Box style={styles.container}>
          <Text>Erro ao carregar tarefa: {taskError?.message}</Text>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <Box style={styles.container}>
        <Text style={styles.title}>Editar Tarefa</Text>

        <Input name="title" control={control} label="Título" placeholder="Título" />

        <Input
          name="description"
          control={control}
          label="Descrição"
          placeholder="Descrição"
          multiline
          numberOfLines={4}
        />

        <Input
          name="due_date"
          control={control}
          label="Data de vencimento (DD/MM/YYYY)"
          placeholder="DD/MM/YYYY"
          keyboardType="numeric"
          maxLength={10}
        />

        <Text style={styles.label}>Prioridade</Text>
        <Box flexDirection="row" marginTop={8} marginBottom={18}>
          {priorities.map((option) => (
            <SelectButton
              key={option.id}
              title={option.label}
              selected={selectedPriority === option.id}
              onPress={() => setSelectedPriority(option.id)}
            />
          ))}
        </Box>

        <Text style={styles.label}>Status:</Text>
        <Box
          flexDirection="row"
          width="100%"
          alignItems="center"
          justifyContent="center"
          marginTop={8}
          marginBottom={18}
        >
          {statuses.map((option) => (
            <SelectButton
              key={option.id}
              title={option.label}
              selected={selectedStatus === option.id}
              onPress={() => setSelectedStatus(option.id)}
            />
          ))}
        </Box>

        <TouchableOpacity
          style={[styles.button, isUpdatingTask ? styles.buttonDisabled : null]}
          onPress={handleSubmit(onSubmit)}
          disabled={isUpdatingTask}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>
            {isUpdatingTask ? 'Salvando...' : 'Salvar Alterações'}
          </Text>
        </TouchableOpacity>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007aff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A0C2EF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
