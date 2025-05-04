import { useQuery, type UseQueryOptions } from '@/libs/reactQuery';

import { api } from '@/services/api';
import { paths } from '@/services/paths';
import { queryKeys } from '@/services/queryKeys';
import { responseSchema, type Response } from '@/services/types';

import { taskResponseSchema, type TaskResponseType } from '@/types/models/task';

const UserAccountResponseSchema = responseSchema(taskResponseSchema);

const getTasksById = async (id: string): Promise<TaskResponseType> => {
  const { data } = await api.get<Response<typeof taskResponseSchema>>(
    `${paths.v1}${paths.tasks}${id}`,
  );

  const res = UserAccountResponseSchema.safeParse(data);

  if (!res.success) {
    console.warn('Failed to parse task list', JSON.stringify(res.error, null, 2));
  }

  return data.data;
};

export const useGetTaskById = (
  id: string,
  options?: Partial<UseQueryOptions<TaskResponseType>>,
) =>
  useQuery({
    queryKey: [queryKeys.tasks],
    queryFn: () => getTasksById(id),
    ...options,
  });
