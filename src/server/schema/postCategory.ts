import { pgTable, integer } from "drizzle-orm/pg-core";
import { posts } from "./post";
import { categories } from "./category";

export const postCategories = pgTable("post_categories", {
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});
