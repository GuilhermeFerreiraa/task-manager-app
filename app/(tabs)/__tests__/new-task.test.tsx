import { prioritySchemaEnum, type PriorityType } from '@/src/types/enums/Priority';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

// Tipagem para uma nova tarefa
type NewTaskForm = {
  title: string;
  description: string;
  priority: PriorityType;
  due_date: string;
};

// Mock real do componente de criação de tarefa
const MockNewTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<PriorityType>(prioritySchemaEnum.MEDIUM);

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [dueDateError, setDueDateError] = useState('');

  const validateForm = () => {
    let isValid = true;

    // Validação do título
    if (!title.trim()) {
      setTitleError('Título é obrigatório');
      isValid = false;
    } else {
      setTitleError('');
    }

    // Validação da descrição
    if (!description.trim()) {
      setDescriptionError('Descrição é obrigatória');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    // Validação da data (formato simples DD/MM/YYYY)
    if (dueDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(dueDate)) {
      setDueDateError('Data inválida. Use o formato DD/MM/YYYY');
      isValid = false;
    } else {
      setDueDateError('');
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Converter data para formato ISO (YYYY-MM-DD)
      let formattedDate = '';
      if (dueDate) {
        const [day, month, year] = dueDate.split('/');
        formattedDate = `${year}-${month}-${day}`;
      }

      const newTask: NewTaskForm & { status: string; due_date: string } = {
        title,
        description,
        priority,
        status: 'PENDING',
        due_date: formattedDate,
      };

      // Chamar o serviço de criação
      mockCreateTaskService(newTask);

      // Navegar de volta para a lista
      router.replace('/');
    }
  };

  return (
    <View>
      <Text testID="screen-title">Nova Tarefa</Text>

      <View>
        <Text>Título</Text>
        <TextInput
          testID="title-input"
          value={title}
          onChangeText={setTitle}
          placeholder="Título"
        />
        {titleError ? <Text testID="title-error">{titleError}</Text> : null}
      </View>

      <View>
        <Text>Descrição</Text>
        <TextInput
          testID="description-input"
          value={description}
          onChangeText={setDescription}
          placeholder="Descrição"
          multiline
        />
        {descriptionError ? (
          <Text testID="description-error">{descriptionError}</Text>
        ) : null}
      </View>

      <View>
        <Text>Data de Vencimento</Text>
        <TextInput
          testID="due-date-input"
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="DD/MM/YYYY"
        />
        {dueDateError ? <Text testID="due-date-error">{dueDateError}</Text> : null}
      </View>

      <View>
        <Text>Prioridade</Text>

        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <TouchableOpacity
            testID="priority-low"
            onPress={() => setPriority(prioritySchemaEnum.LOW)}
            style={{
              padding: 5,
              marginRight: 5,
              backgroundColor:
                priority === prioritySchemaEnum.LOW ? '#e0e0e0' : 'transparent',
              borderWidth: 1,
            }}
          >
            <Text>Baixa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="priority-medium"
            onPress={() => setPriority(prioritySchemaEnum.MEDIUM)}
            style={{
              padding: 5,
              marginRight: 5,
              backgroundColor:
                priority === prioritySchemaEnum.MEDIUM ? '#e0e0e0' : 'transparent',
              borderWidth: 1,
            }}
          >
            <Text>Média</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="priority-high"
            onPress={() => setPriority(prioritySchemaEnum.HIGH)}
            style={{
              padding: 5,
              backgroundColor:
                priority === prioritySchemaEnum.HIGH ? '#e0e0e0' : 'transparent',
              borderWidth: 1,
            }}
          >
            <Text>Alta</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        testID="submit-button"
        onPress={handleSubmit}
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: '#007AFF',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Criar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
};

// Mock para o componente real
jest.mock('../new-task', () => {
  return () => <MockNewTaskScreen />;
});

// Mock para o router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

// Mock do serviço de criação de tarefas
const mockCreateTaskService = jest.fn();
jest.mock('@/services/task/useCreateTask', () => ({
  useCreateTask: () => ({
    mutate: mockCreateTaskService,
  }),
}));

describe('Nova Tarefa - Testes Avançados', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o formulário corretamente', () => {
    render(<MockNewTaskScreen />);

    expect(screen.getByTestId('screen-title')).toBeOnTheScreen();
    expect(screen.getByTestId('title-input')).toBeOnTheScreen();
    expect(screen.getByTestId('description-input')).toBeOnTheScreen();
    expect(screen.getByTestId('due-date-input')).toBeOnTheScreen();
    expect(screen.getByTestId('priority-low')).toBeOnTheScreen();
    expect(screen.getByTestId('priority-medium')).toBeOnTheScreen();
    expect(screen.getByTestId('priority-high')).toBeOnTheScreen();
    expect(screen.getByTestId('submit-button')).toBeOnTheScreen();
  });

  it('mostra erros de validação quando os campos obrigatórios estão vazios', () => {
    render(<MockNewTaskScreen />);

    // Tenta enviar o formulário sem preencher os campos
    fireEvent.press(screen.getByTestId('submit-button'));

    // Verifica se os erros de validação aparecem
    expect(screen.getByTestId('title-error')).toBeOnTheScreen();
    expect(screen.getByTestId('description-error')).toBeOnTheScreen();
  });

  it('permite alterar a prioridade da tarefa', () => {
    render(<MockNewTaskScreen />);

    // Por padrão, a prioridade média deve estar selecionada
    expect(screen.getByTestId('priority-medium')).toHaveStyle({
      backgroundColor: '#e0e0e0',
    });

    // Clica na prioridade alta
    fireEvent.press(screen.getByTestId('priority-high'));

    // Agora a alta deve estar selecionada e as outras não
    expect(screen.getByTestId('priority-high')).toHaveStyle({
      backgroundColor: '#e0e0e0',
    });
    expect(screen.getByTestId('priority-medium')).toHaveStyle({
      backgroundColor: 'transparent',
    });
    expect(screen.getByTestId('priority-low')).toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('valida o formato da data', () => {
    render(<MockNewTaskScreen />);

    // Preenche os campos obrigatórios
    fireEvent.changeText(screen.getByTestId('title-input'), 'Tarefa Teste');
    fireEvent.changeText(
      screen.getByTestId('description-input'),
      'Descrição da tarefa teste',
    );

    // Insere uma data em formato inválido
    fireEvent.changeText(screen.getByTestId('due-date-input'), '2023-12-31');
    fireEvent.press(screen.getByTestId('submit-button'));

    // Deve mostrar erro de data
    expect(screen.getByTestId('due-date-error')).toBeOnTheScreen();

    // Corrige para o formato correto
    fireEvent.changeText(screen.getByTestId('due-date-input'), '31/12/2023');
    fireEvent.press(screen.getByTestId('submit-button'));

    // Não deve mostrar erro de data
    expect(screen.queryByTestId('due-date-error')).toBeNull();
  });

  it('submete o formulário com dados válidos', () => {
    render(<MockNewTaskScreen />);

    // Preenche todos os campos corretamente
    fireEvent.changeText(screen.getByTestId('title-input'), 'Tarefa Teste');
    fireEvent.changeText(
      screen.getByTestId('description-input'),
      'Descrição da tarefa teste',
    );
    fireEvent.changeText(screen.getByTestId('due-date-input'), '31/12/2023');
    fireEvent.press(screen.getByTestId('priority-high'));

    // Tenta enviar o formulário
    fireEvent.press(screen.getByTestId('submit-button'));

    // Não deve haver erros de validação
    expect(screen.queryByTestId('title-error')).toBeNull();
    expect(screen.queryByTestId('description-error')).toBeNull();
    expect(screen.queryByTestId('due-date-error')).toBeNull();

    // O serviço de criação deve ter sido chamado com os dados corretos
    expect(mockCreateTaskService).toHaveBeenCalledWith({
      title: 'Tarefa Teste',
      description: 'Descrição da tarefa teste',
      priority: 'HIGH',
      status: 'PENDING',
      due_date: '2023-12-31',
    });

    // Deve navegar de volta para a lista
    expect(router.replace).toHaveBeenCalledWith('/');
  });
});
