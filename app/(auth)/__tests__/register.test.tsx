import { render, screen } from '@testing-library/react-native';
import React from 'react';

import RegisterScreen from '../register';

// Mock do expo-router (simplificado)
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
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
  useForm: () => ({
    control: {},
    handleSubmit: jest.fn((fn) => fn),
    formState: { errors: {} },
    watch: jest.fn(),
    setValue: jest.fn(),
  }),
  useController: ({ name }: any) => ({
    field: {
      name: name,
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: {},
    },
    fieldState: { invalid: false, error: null },
    formState: { errors: {} },
  }),
}));

// Mock do hook useRegister (evita chamadas reais à API)
jest.mock('@/services/auth', () => ({
  // Manter o mock de useLogin se este arquivo for importado indiretamente
  useLogin: jest.fn(() => ({
    mutate: jest.fn(),
  })),
  // Adicionar mock de useRegister
  useRegister: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

describe('RegisterScreen', () => {
  it('renders register title, inputs, and buttons', () => {
    render(<RegisterScreen />);

    // Verifica título
    expect(screen.getByText('Cadastro')).toBeOnTheScreen();

    // Verifica placeholders dos inputs
    expect(screen.queryByPlaceholderText('Digite seu nome')).toBeOnTheScreen();
    expect(screen.queryByPlaceholderText('Digite seu e-mail')).toBeOnTheScreen();
    expect(screen.queryByPlaceholderText('Digite sua senha')).toBeOnTheScreen();

    // Verifica botões
    expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /Faça login/i })).toBeOnTheScreen();
  });
});
