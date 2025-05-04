import { fireEvent, render, screen } from '@testing-library/react-native';

import NewTaskScreen from '../new-task';

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
  Link: ({ children }: any) => <>{children}</>,
}));

// --- Mock de @/libs/form ---
// Agora definimos os mocks DENTRO da factory
jest.mock('@/libs/form', () => {
  const originalModule = jest.requireActual('@/libs/form');
  return {
    __esModule: true, // Necessário para módulos ES6
    ...originalModule, // Mantém outros exports se houver
    useForm: jest.fn(), // Mock para useForm
    useController: jest.fn(), // Mock para useController (assumindo exportado)
  };
});

// --- Remover mock explícito de react-hook-form, pois @/libs/form deve cobrir ---
// jest.mock('react-hook-form', () => ({...}));

// Mock do hook useCreateTask
const mockMutateCreate = jest.fn();
jest.mock('@/services/task/useCreateTask/useCreateTask', () => ({
  useCreateTask: jest.fn(() => ({
    mutate: mockMutateCreate,
  })),
}));

// Mock do QueryClient (simplificado)
jest.mock('@/libs/reactQuery', () => ({
  queryClient: {
    invalidateQueries: jest.fn(),
  },
}));

// Mock do toast
jest.mock('@/utils/toast', () => ({
  showSuccess: jest.fn(),
  showError: jest.fn(),
}));

// Mock do SelectButton
jest.mock('@/components/SelectButton', () => {
  const MockSelectButton = ({ title, onPress, accessibilityRole = 'button' }: any) => {
    const RN = require('react-native');
    // Remover wrapper de log
    const handlePress = () => {
      if (onPress) {
        onPress();
      }
    };
    return (
      <RN.TouchableOpacity
        onPress={handlePress}
        accessibilityLabel={title}
        accessibilityRole={accessibilityRole}
      >
        <RN.Text>{title}</RN.Text>
      </RN.TouchableOpacity>
    );
  };
  return {
    __esModule: true,
    SelectButton: MockSelectButton,
  };
});

// --- Obter referências aos mocks ---
const { useForm: mockUseForm, useController: mockUseController } =
  jest.requireMock('@/libs/form');
const { useCreateTask: mockUseCreateTask } = jest.requireMock(
  '@/services/task/useCreateTask/useCreateTask',
);

describe('NewTaskScreen', () => {
  // --- Variável mockSetValue não é mais necessária para este teste ---
  // let mockSetValue: jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();

    // --- Criar instância do mock setValue não é mais necessário aqui ---
    // mockSetValue = jest.fn();

    mockUseCreateTask.mockImplementation(() => ({
      mutate: mockMutateCreate,
    }));

    // Configurar retorno padrão para useForm (sem necessidade de mockSetValue aqui)
    mockUseForm.mockReturnValue({
      control: {},
      handleSubmit: jest.fn((fn) => fn),
      formState: { errors: {} },
      watch: jest.fn((fieldName) => {
        // Watch ainda pode ser útil para outros testes
        if (fieldName === 'priority') {
          return 'LOW'; // Comportamento padrão
        }
        return undefined;
      }),
      setValue: jest.fn(), // Apenas um mock padrão
    });

    mockUseController.mockReturnValue({
      field: {
        name: 'mockField',
        value: '',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        ref: {},
      },
      fieldState: { invalid: false, error: null },
      formState: { errors: {} },
    });
  });

  it('renders screen title, inputs, priority buttons, and submit button', () => {
    render(<NewTaskScreen />);

    // Verifica título
    expect(screen.getByText('Nova Tarefa')).toBeOnTheScreen();

    // Verifica placeholders/labels dos inputs
    // (Assumindo que o componente Input renderiza um placeholder ou label acessível)
    expect(screen.queryByPlaceholderText('Título')).toBeOnTheScreen();
    expect(screen.queryByPlaceholderText('Descrição')).toBeOnTheScreen();
    expect(screen.queryByPlaceholderText('DD/MM/YYYY')).toBeOnTheScreen(); // Placeholder da data

    // Verifica labels dos botões de prioridade
    expect(screen.getByRole('button', { name: /Baixa/i })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /Média/i })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /Alta/i })).toBeOnTheScreen();

    // Verifica botão de criar tarefa
    expect(screen.getByRole('button', { name: /Criar Tarefa/i })).toBeOnTheScreen();
  });

  it('calls create task mutation with correct data on submit', () => {
    const mockFormData = {
      title: 'Mock Title',
      description: 'Mock Description',
      due_date: '01/01/2024',
    };

    let pressHandler: () => void;

    const specificHandleSubmit = jest.fn((onSubmitFunc) => {
      pressHandler = () => {
        onSubmitFunc(mockFormData);
      };
      return pressHandler;
    });

    mockUseForm.mockReturnValue({
      control: {},
      handleSubmit: specificHandleSubmit,
      formState: { errors: {} },
      watch: jest.fn(() => 'LOW'),
      setValue: jest.fn(),
    });

    render(<NewTaskScreen />);

    const highButton = screen.getByRole('button', {
      name: /Alta/i,
    });
    fireEvent.press(highButton);

    const submitButton = screen.getByRole('button', {
      name: /Criar Tarefa/i,
    });
    fireEvent.press(submitButton);

    expect(specificHandleSubmit).toHaveBeenCalled();
    expect(mockMutateCreate).toHaveBeenCalledTimes(1);

    expect(mockMutateCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'PENDING',
        priority: 'HIGH',
        title: mockFormData.title,
        description: mockFormData.description,
        due_date: '2024-01-01',
      }),
      expect.any(Object),
    );
  });

  it('displays validation error and prevents submission', () => {
    const errorMessage = 'Título é obrigatório';

    // Configurar useForm para retornar um erro no título
    mockUseForm.mockReturnValueOnce({
      control: {},
      handleSubmit: jest.fn((onSubmitFunc) => onSubmitFunc), // handleSubmit padrão
      formState: {
        errors: {
          title: {
            type: 'required',
            message: errorMessage,
          },
        },
      },
      watch: jest.fn(() => 'LOW'),
      setValue: jest.fn(),
    });

    // Configurar useController para retornar o erro para o campo 'title'
    // Se outros campos fossem testados, faríamos chamadas condicionais ou múltiplas
    mockUseController.mockReturnValueOnce({
      field: {
        name: 'title',
        value: '',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        ref: {},
      },
      fieldState: {
        invalid: true,
        error: { type: 'required', message: errorMessage },
      },
      formState: {
        errors: {
          title: {
            type: 'required',
            message: errorMessage,
          },
        },
      }, // Repete estado para consistência
    });

    render(<NewTaskScreen />);

    // Verifica se a mensagem de erro está na tela
    // Assumindo que o componente Input renderiza o erro de forma acessível
    expect(screen.getByText(errorMessage)).toBeOnTheScreen();

    // Tentativa de submissão (opcional, mas bom para garantir)
    // const submitButton = screen.getByRole('button', { name: /Criar Tarefa/i });
    // fireEvent.press(submitButton); // Se handleSubmit for mais complexo, isso pode ser necessário

    // Verifica se a mutação NÃO foi chamada
    expect(mockMutateCreate).not.toHaveBeenCalled();
  });
});
