import { render, screen, fireEvent } from '@testing-library/react-native';
import React from 'react';

import TasksScreen from '../index';

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
  // Simple mock, just renders children
  Link: ({ children }: any) => <>{children}</>,
}));

// Mock @tanstack/react-query
const mockTasks = [
  {
    id: '1',
    title: 'Task Test 1',
    description: 'Desc 1',
    status: 'PENDING',
    priority: 'MEDIUM',
    user_id: '1',
  },
  {
    id: '2',
    title: 'Task Test 2',
    description: 'Desc 2',
    status: 'COMPLETED',
    priority: 'LOW',
    user_id: '1',
  },
];

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(() => ({
    data: { data: mockTasks }, // Simulate API response structure
    isLoading: false,
    isError: false,
  })),
  // Mock useMutation if needed for other actions (update, etc)
  // Mock QueryClient if used directly
}));

// Mock the useDeleteTask hook
const mockMutateDelete = jest.fn();
jest.mock('@/services/task/useDeleteTask/useDeleteTask', () => ({
  useDeleteTask: jest.fn(() => ({
    mutate: mockMutateDelete,
  })),
}));

// Mock toast utility
jest.mock('@/utils/toast', () => ({
  showSuccess: jest.fn(),
  showError: jest.fn(),
}));

describe('TasksScreen (Board)', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    // Reset useQuery mock to the default success state
    (jest.requireMock('@tanstack/react-query').useQuery as jest.Mock).mockReturnValue({
      data: { data: mockTasks },
      isLoading: false,
      isError: false,
    });
  });

  it('renders screen title and list of tasks', () => {
    render(<TasksScreen />);

    // Verify screen title
    expect(screen.getByText('Minhas Tarefas')).toBeOnTheScreen(); // Title kept in Portuguese as it's UI text

    // Verify task details are rendered
    expect(screen.getByText('Task Test 1')).toBeOnTheScreen();
    expect(screen.getByText('Desc 1')).toBeOnTheScreen();
    expect(screen.getByText('Task Test 2')).toBeOnTheScreen();
    expect(screen.getByText('Desc 2')).toBeOnTheScreen();

    // Verify edit and delete buttons exist (using regex for flexibility)
    expect(screen.getAllByRole('button', { name: /Editar/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /Excluir/i }).length).toBeGreaterThan(0);

    // Verify add task button exists
    expect(screen.getByRole('button', { name: '+' })).toBeOnTheScreen();
  });

  it('shows loading state', () => {
    // Simulate loading state
    (jest.requireMock('@tanstack/react-query').useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<TasksScreen />);

    // Verify loading text is displayed
    expect(screen.getByText('Carregando...')).toBeOnTheScreen(); // Kept in Portuguese
  });

  // Test for delete button click (example)
  it('calls delete mutation when delete button is pressed', () => {
    render(<TasksScreen />);

    // Find all delete buttons
    const deleteButtons = screen.getAllByRole('button', {
      name: /Excluir/i,
    });

    // Simulate click on the first delete button
    fireEvent.press(deleteButtons[0]);

    // Verify that the useDeleteTask mutate function was called with the correct ID
    expect(mockMutateDelete).toHaveBeenCalledWith(mockTasks[0].id, expect.any(Object));

    // Verify that the task "Task Test 1" is no longer in the list (using queryByText)
    expect(screen.queryByText('Task Test 1')).toBeNull();
  });
});
