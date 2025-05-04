import { z } from '@/libs/zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  email_verified_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const userResponseSchema = z.object({
  user: userSchema,
  access_token: z.string(),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  email: z.string().email('Email inválido'),
});

export type UserResponseType = z.infer<typeof userResponseSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UserType = z.infer<typeof userSchema>;
