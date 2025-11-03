import { router, publicProcedure } from "./trpcHelpers";
import { postRouter } from "../routers/posts";
import { categoryRouter } from "../routers/categories";

export const appRouter = router({
  post: postRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
