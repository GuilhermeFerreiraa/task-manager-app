import { z } from '@/libs/zod';

export const statusSchema = z.enum(['PENDING', 'COMPLETED']);

export const statusSchemaEnum = statusSchema.enum;

export type StatusSchema = z.infer<typeof statusSchema>;
