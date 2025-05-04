import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Input, SelectButton } from '@/components';

import { useNewTask } from '@/hooks/tabs/useNewTask';

import { priorities } from '@/utils/options';

export default function NewTaskScreen() {
  const { control, handleSubmit, errors, onSubmit, selectedId, setSelectedId } =
    useNewTask();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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

        <Text style={styles.label}>Prioridade</Text>
        <Box flexDirection="row" marginTop={18} marginBottom={18}>
          {priorities.map((option) => (
            <SelectButton
              key={option.id}
              title={option.label}
              selected={selectedId === option.id}
              onPress={() => setSelectedId(option.id)}
            />
          ))}
        </Box>

        <Input
          name="due_date"
          control={control}
          label="Data de vencimento"
          error={errors.due_date?.message}
          placeholder="DD/MM/YYYY"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Criar Tarefa</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginBottom: 5,
    marginTop: 10,
  },
});
