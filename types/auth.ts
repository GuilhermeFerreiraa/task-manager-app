import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
} 