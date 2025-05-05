import { z } from '@/src/libs/zod';

import { api } from '@/services/api';
import { paths } from '@/services/paths';
import { queryKeys } from '@/services/queryKeys';
import { responseSchema, type Response } from '@/services/types';

import { taskResponseSchema, type TaskResponseType } from '@/types/models/task';

import { useQuery, type UseQueryOptions } from '@/libs/reactQuery';

const ResponseTasksSchema = z.array(taskResponseSchema);
const ResponseSchema = responseSchema(ResponseTasksSchema);

const getTasks = async (): Promise<TaskResponseType[]> => {
  const { data } = await api.get<Response<typeof ResponseTasksSchema>>(
    `${paths.v1}${paths.tasks}`,
  );

  const res = ResponseSchema.safeParse(data);

  if (!res.success) {
    console.warn('Failed to parse task list', JSON.stringify(res.error, null, 2));
  }

  return data.data;
};

export const useListTask = (options?: Partial<UseQueryOptions<TaskResponseType[]>>) =>
  useQuery({
    queryKey: [queryKeys.tasks],
    queryFn: () => getTasks(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    ...options,
  });
