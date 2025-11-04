import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title"),
  slug: text("slug"),
  content: text("content"),
  categoryId: integer("category_id").$type<number | null>(), // nullable column
});
