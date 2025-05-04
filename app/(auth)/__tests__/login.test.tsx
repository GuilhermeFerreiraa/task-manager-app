import { render, screen } from '@testing-library/react-native';
import React from 'react';

import LoginScreen from '../(login)/login'; // Ajuste o caminho se necessário

// Mock de dependências externas (ex: expo-router, zustand, react-hook-form)
// Isso é crucial para isolar o componente que está sendo testado.
// Mocking pode ser complexo e depende das dependências exatas.
// Vamos começar sem mocks profundos e adicioná-los se necessário.

// Mock do expo-router (simplificado)
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
  // Retorna um fragmento ou um componente básico conhecido
  Link: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
}));

// Mock do zustand store (simplificado)
jest.mock('@/store/auth', () => ({
  useAuthStore: jest.fn(() => ({
    setAuth: jest.fn(),
  })),
}));

// Mock de react-hook-form
jest.mock('react-hook-form', () => ({
  // Mock para useForm
  useForm: () => ({
    control: jest.fn((/* _control */) => ({
      name: 'email', // or any other necessary properties
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: {},
    })),
    handleSubmit: jest.fn((fn) => fn),
    formState: { errors: {} },
    watch: jest.fn(),
    setValue: jest.fn(),
    // Adicione outros métodos/propriedades de useForm que seu componente usa
  }),
  // Mock para useController
  useController: ({ name }: any) => ({
    field: {
      name: name,
      value: '', // Valor inicial mockado
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: {},
    },
    fieldState: { invalid: false, error: null },
    formState: { errors: {} },
  }),
  // Mock para Controller (se você usar o componente Controller)
  // Controller: ({ render }: any) => render({ field: { value: '', onChange: jest.fn() } }),
}));

// Mock do hook useLogin (evita chamadas reais à API)
jest.mock('@/services/auth', () => ({
  useLogin: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

// Mock do componente Input (se ele não for simples)
// Se Input for complexo, podemos precisar mocká-lo também.
// Por enquanto, vamos assumir que ele renderiza um TextInput padrão.
// jest.mock('@/components', () => ({
//   ...jest.requireActual('@/components'), // Mantém outros exports
//   Input: (props: any) => <mock-input {...props} />,
// }));

jest.mock('@/components/Button', () => ({
  Button: jest.fn(({ title }) => <button>{title}</button>),
}));

describe('LoginScreen', () => {
  it('renders login title, email/password inputs, and buttons', () => {
    render(<LoginScreen />);

    // Verifica se o título está na tela
    expect(screen.getByText('Login')).toBeOnTheScreen();

    // Verifica se os placeholders dos inputs estão na tela
    // Usamos queryByPlaceholderText porque getBy... lança erro se não encontrar
    expect(screen.queryByPlaceholderText('Digite seu e-mail')).toBeOnTheScreen();
    expect(screen.queryByPlaceholderText('Digite sua senha')).toBeOnTheScreen();

    // Verifica se os botões estão na tela
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /Cadastre-se/i })).toBeOnTheScreen(); // Pode precisar ajustar o seletor do link
  });

  // Poderíamos adicionar mais testes aqui:
  // - Simular digitação nos campos
  // - Simular clique no botão "Entrar" e verificar se a função de submit é chamada
  // - Verificar se mensagens de erro aparecem com dados inválidos (requer mock mais elaborado)
});
