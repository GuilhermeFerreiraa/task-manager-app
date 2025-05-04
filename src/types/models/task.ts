import { z } from '@/libs/zod';

import { prioritySchema } from '../enums/Priority';
import { statusSchema } from '../enums/Status';

export const taskSchema = z.object({
  title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres'),
  description: z.string().optional().nullable(),
  due_date: z.string().optional(),
  priority: prioritySchema.optional(),
  status: statusSchema.optional(),
  completed: z.boolean().optional(),
});

export const taskResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: statusSchema,
  due_date: z.string().nullable(),
  priority: prioritySchema,
  completed: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  user_id: z.number(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    email_verified_at: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
});

export const editTaskSchema = taskSchema.extend({
  priority: prioritySchema.optional(),
  status: statusSchema.optional(),
});

export type TaskResponseType = z.infer<typeof taskResponseSchema>;
export type TaskFormDataType = z.infer<typeof taskSchema>;
