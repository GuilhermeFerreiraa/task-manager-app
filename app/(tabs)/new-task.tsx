import { StyleSheet, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { Box, Button, Input, SelectButton } from '@/components';

import { useNewTask } from '@/hooks/tabs/useNewTask';

import { priorities } from '@/utils/options';
import { prioritySchemaEnum } from '@/types/enums/Priority';

export default function NewTaskScreen() {
  
  const { 
    control, 
    handleSubmit, 
    onSubmit, 
    selectedId, 
    setSelectedId, 
    reset,
    isLoading
  } = useNewTask();   

  useFocusEffect(
    useCallback(() => {
      reset({
        title: '',
        description: '',
        due_date: '',
      });
      setSelectedId(prioritySchemaEnum.LOW);
    }, [reset, setSelectedId])
  );

  const handleClearForm = () => {
    reset({
      title: '',
      description: '',
      due_date: '',
    });
    setSelectedId(prioritySchemaEnum.LOW);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <Box style={styles.container}>
        <Text style={styles.title}>Nova Tarefa</Text>

        <Input
          name="title"
          control={control}
          label="Título"
          placeholder="Título"
        />

        <Input
          name="description"
          control={control}
          label="Descrição"
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
          placeholder="DD/MM/YYYY"
          keyboardType="numeric"
          maxLength={10}
        />

        <Box style={styles.buttonContainer}>
          <Button
            title="Criar Tarefa"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            variant="primary"
            style={styles.buttonFlex}
          />
          
          <Button
            title="Limpar"
            onPress={handleClearForm}
            disabled={isLoading}
            variant="danger"
            style={styles.buttonFlex}
          />
        </Box>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  buttonFlex: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginBottom: 5,
    marginTop: 10,
  },
});
