import type { AxiosError } from '@/libs/axios';
import { useMutation } from '@/libs/reactQuery';

import { showError } from '@/utils/toast';

import { userResponseSchema, type UserResponseType } from '@/types/models/auth';

import { api } from '../../api';
import { paths } from '../../paths';
import { responseSchema } from '../../types';

type LoginType = {
  email: string;
  password: string;
};

const LoginResponse = responseSchema(userResponseSchema);

const postLogin = async (params: LoginType): Promise<UserResponseType> => {
  const { data } = await api.post(`${paths.v1}${paths.login}`, params);

  const result = LoginResponse.safeParse(data);

  if (!result.success) {
    console.warn('Unable to parse login response', result.error.message);
  }

  return data.data;
};

export const useLogin = () => {
  return useMutation<UserResponseType, AxiosError<{ message?: string }>, LoginType>({
    mutationFn: postLogin,
    onError: (error) => {
      let errorMessage = 'Erro desconhecido ao fazer login.';

      if (error.response) {
        const status = error.response.status;
        const backendMessage = error.response.data?.message;

        console.warn('Login API Error:', status, error.response.data);

        if (status === 401 || status === 422) {
          errorMessage = backendMessage || 'Usuário ou senha inválida.';
        } else {
          errorMessage = backendMessage || `Erro ${status} ao fazer login.`;
        }
      } else if (error.request) {
        console.warn('Login Network Error:', error.request);
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
      } else {
        console.warn('Login Generic Error:', error.message);
      }

      showError(errorMessage);
    },
  });
};
