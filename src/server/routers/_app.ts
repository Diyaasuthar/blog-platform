import { postRouter } from "./posts";
import { categoryRouter } from "./categories";
import { router } from "../trpc/trpcHelpers";

export const appRouter = router({
  post: postRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
