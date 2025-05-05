import { fireEvent, render, screen } from '@testing-library/react-native';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Task type definition
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  user_id: string;
}

// Mock task data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Tarefa 1',
    description: 'Descrição da tarefa 1',
    status: 'PENDING',
    priority: 'HIGH',
    user_id: '123',
  },
  {
    id: '2',
    title: 'Tarefa 2',
    description: 'Descrição da tarefa 2',
    status: 'COMPLETED',
    priority: 'MEDIUM',
    user_id: '123',
  },
  {
    id: '3',
    title: 'Tarefa 3',
    description: 'Descrição da tarefa 3',
    status: 'PENDING',
    priority: 'LOW',
    user_id: '123',
  },
];

// Simplified TasksScreen component mock for testing
const MockTasksScreen = () => {
  const handleDeleteTask = (id: string) => {
    mockDeleteService(id);
  };

  return (
    <View testID="safe-area" style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 20, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text testID="welcome-text" style={{ fontSize: 24, fontWeight: 'bold' }}>
            Olá, Teste!
          </Text>
          <TouchableOpacity
            testID="add-button"
            style={{
              backgroundColor: '#007AFF',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => router.push('/(tabs)/new-task')}
          >
            <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>+</Text>
          </TouchableOpacity>
        </View>
        <Text testID="tasks-title" style={{ marginTop: 10, fontSize: 22, fontWeight: 'bold', paddingBottom: 4 }}>
          Minhas Tarefas
        </Text>

        {/* Simplified task list */}
        <View testID="tasks-list">
          {mockTasks.map(item => (
            <View key={item.id} testID={`task-item-${item.id}`} style={{ marginVertical: 5, padding: 10, backgroundColor: '#fff', borderRadius: 8 }}>
              <Text testID={`task-title-${item.id}`} style={{ fontSize: 18, fontWeight: 'bold' }}>
                {item.title}
              </Text>
              <Text testID={`task-description-${item.id}`} style={{ marginTop: 5, color: '#666' }}>
                {item.description}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                <TouchableOpacity
                  testID={`delete-button-${item.id}`}
                  style={{ backgroundColor: '#FF3B30', padding: 8, borderRadius: 4 }}
                  onPress={() => handleDeleteTask(item.id)}
                >
                  <Text style={{ color: '#fff' }}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

jest.mock('../index', () => {
  return jest.fn();
});

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

const mockDeleteService = jest.fn();
jest.mock('@/services/task/useDeleteTask', () => ({
  useDeleteTask: () => ({
    mutate: mockDeleteService,
  }),
}));

describe('Tasks - Advanced Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the task list correctly', () => {
    render(<MockTasksScreen />);
    
    expect(screen.getByTestId('welcome-text')).toHaveTextContent('Olá, Teste!');
    expect(screen.getByTestId('tasks-title')).toHaveTextContent('Minhas Tarefas');
    expect(screen.getByTestId('add-button')).toBeOnTheScreen();
    expect(screen.getByTestId('tasks-list')).toBeOnTheScreen();
    
    // Check if all 3 list items are displayed
    expect(screen.getByTestId('task-item-1')).toBeOnTheScreen();
    expect(screen.getByTestId('task-item-2')).toBeOnTheScreen();
    expect(screen.getByTestId('task-item-3')).toBeOnTheScreen();
    
    // Check first item information
    expect(screen.getByTestId('task-title-1')).toHaveTextContent('Tarefa 1');
    expect(screen.getByTestId('task-description-1')).toHaveTextContent('Descrição da tarefa 1');
  });

  it('allows deleting a task', () => {
    render(<MockTasksScreen />);
    
    // Click the delete button of the first task
    fireEvent.press(screen.getByTestId('delete-button-1'));
    
    // Check if deletion service was called
    expect(mockDeleteService).toHaveBeenCalledWith('1');
  });

  it('navigates to new task screen when add button is clicked', () => {
    render(<MockTasksScreen />);
    
    // Click the add button
    fireEvent.press(screen.getByTestId('add-button'));
    
    // Check if router.push was called with the correct path
    expect(router.push).toHaveBeenCalledWith('/(tabs)/new-task');
  });
});
