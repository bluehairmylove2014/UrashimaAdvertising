import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { reactQueryDevtoolsConfig } from '../configs';

const queryClient = new QueryClient();

type QueryProviderProps = {
  children: React.ReactNode;
};

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {reactQueryDevtoolsConfig.isActive && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default QueryProvider;
