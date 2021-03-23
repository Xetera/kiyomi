import { createReactQueryHooks, createTRPCClient } from '@trpc/react';
import { QueryClient } from 'react-query';
// Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import type { AppRouter } from '../pages/api/trpc/[trpc]';

export const client = createTRPCClient<AppRouter>({
  url: '/api/trpc',
});

export const trpc = createReactQueryHooks({
  client,
  queryClient: new QueryClient(),
});