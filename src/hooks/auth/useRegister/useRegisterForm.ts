import { router } from 'expo-router';

import { useForm } from '@/libs/reactHookForm';
import { zodResolver } from '@/libs/zod';

import { useRegister } from '@/services/auth';

import { registerSchema, type RegisterFormData } from '@/types/models/auth';

import { useAuthStore } from '@/store/auth';

export const useRegisterForm = () => {
  const login = useAuthStore((state) => state.login);
  const { mutate: onRegister } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    onRegister(data, {
      onSuccess: ({ access_token, user }) => {
        login({
          user,
          accessToken: access_token,
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
