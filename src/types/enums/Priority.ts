import { z } from '@/libs/zod';

export const prioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH']);

export const prioritySchemaEnum = prioritySchema.enum;

export type PriorityType = z.infer<typeof prioritySchema>;
