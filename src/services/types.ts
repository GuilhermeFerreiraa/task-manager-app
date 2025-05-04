import { z } from '@/libs/zod';

export const responseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    statusCode: z.number(),
    message: z.unknown(),
    data: dataSchema,
  });

export type Response<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof responseSchema<T>>
>;
