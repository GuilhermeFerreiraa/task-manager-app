import { ReactNode } from 'react';

import { queryClient, QueryClientProvider } from '@/libs/reactQuery';

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
