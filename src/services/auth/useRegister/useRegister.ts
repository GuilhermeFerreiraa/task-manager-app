import { AxiosError } from '@/libs/axios';
import { useMutation } from '@/libs/reactQuery';

import { api } from '@/services/api';

import { showError } from '@/utils/toast';

import {
  RegisterFormData,
  userResponseSchema,
  type UserResponseType,
} from '@/types/models/auth';

import { paths } from '../../paths';
import { Response, responseSchema } from '../../types';

const RegisterUserResponse = responseSchema(userResponseSchema);

export const postRegister = async (
  params: RegisterFormData,
): Promise<UserResponseType> => {
  const { data } = await api.post<Response<typeof userResponseSchema>>(
    `${paths.v1}${paths.register}`,
    params,
  );

  const result = RegisterUserResponse.safeParse(data);

  if (!result.success) {
    console.warn('Unable to parse register user response ', result.error);
  }

  return data.data;
};

export const useRegister = () => {
  return useMutation<
    UserResponseType,
    AxiosError<{
      message?: string;
      errors?: Record<string, string[]>;
    }>,
    RegisterFormData
  >({
    mutationFn: postRegister,
    onError: (error) => {
      let errorMessage = 'Erro desconhecido ao registrar.';

      if (error.response) {
        const status = error.response.status;
        const backendMessage = error.response.data?.message;
        const validationErrors = error.response.data?.errors;

        console.warn('Register API Error:', status, error.response.data);

        if (status === 422) {
          if (validationErrors && typeof validationErrors === 'object') {
            const firstErrorField = Object.keys(validationErrors)[0];
            errorMessage =
              validationErrors[firstErrorField]?.[0] ||
              backendMessage ||
              'Erro de validação ao registrar.';
          } else {
            errorMessage = backendMessage || 'Erro de validação ao registrar.';
          }
        } else {
          errorMessage = backendMessage || `Erro ${status} ao registrar.`;
        }
      } else if (error.request) {
        console.warn('Register Network Error:', error.request);
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
      } else {
        console.warn('Register Generic Error:', error.message);
        errorMessage = error.message || errorMessage;
      }

      showError(errorMessage);
    },
  });
};
