import { router, publicProcedure } from "../trpc/trpcHelpers";
import { z } from "zod";
import { db } from "@/lib/db";
import { categories } from "../schema/category";
import { eq } from "drizzle-orm";

export const categoryRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(categories);
  }),

  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      await db.insert(categories).values({ name: input.name });
      return { success: true };
    }),

  delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    await db.delete(categories).where(eq(categories.id, input));
    return { success: true };
  }),
});
