import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';

const queryClient = new QueryClient();

type ReactQueryClientProviderProps = {
    children: ReactNode;
};

export const ReactQueryClientProvider = ({ children }: ReactQueryClientProviderProps) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

export { queryClient };