import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: 'always',
      retryDelay: 1000,
      retry: 3,
    },
  },
});

export {
  queryClient,
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
};
