import { router, publicProcedure } from "../trpc/trpcHelpers";
import { z } from "zod";
import { db } from "@/lib/db";
import { posts } from "../schema/post";
import { eq } from "drizzle-orm";
import slugify from "slugify";

export const postRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(posts);
  }),

  getById: publicProcedure.input(z.number()).query(async ({ input }) => {
    const [post] = await db.select().from(posts).where(eq(posts.id, input));
    return post;
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const slug = slugify(input.title, { lower: true });
      await db.insert(posts).values({
        title: input.title,
        slug,
        content: input.content,
      });
      return { success: true };
    }),

  delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    await db.delete(posts).where(eq(posts.id, input));
    return { success: true };
  }),
});
