// src/providers/TRPCProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/routers/_app"; // backend router type
import { httpBatchLink } from "@trpc/client";
import { ReactNode } from "react";

// Create TRPC hooks for the AppRouter
export const trpc = createTRPCReact<AppRouter>();

const queryClient = new QueryClient();

export function TRPCProvider({ children }: { children: ReactNode }) {
  // Create TRPC client
  const client = trpc.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  });

  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
