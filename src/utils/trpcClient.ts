"use client";

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/trpc/trpc";

// Create tRPC React hooks with correct typing
export const trpc = createTRPCReact<AppRouter>();
