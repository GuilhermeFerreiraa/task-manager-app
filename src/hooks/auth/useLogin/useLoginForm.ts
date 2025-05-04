import { router } from 'expo-router';

import { useForm } from '@/libs/reactHookForm';
import { zodResolver } from '@/libs/zod';

import { useLogin } from '@/services/auth';

import { loginSchema, type LoginFormData } from '@/types/models/auth';

import { useAuthStore } from '@/store/auth';

export const useLoginForm = () => {
  const { mutate: onLogin } = useLogin();
  const login = useAuthStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    onLogin(data, {
      onSuccess: (data) => {
        login({
          accessToken: data.access_token,
          user: data.user,
        });
        router.replace('/(tabs)');
      },
    });
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
  };
};
