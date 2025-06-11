'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export const Providers = ({ children }: { children: ReactNode }) => {
    const [client] = useState(() => new QueryClient());
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
