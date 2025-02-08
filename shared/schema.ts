import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'furniture' or 'electronics'
  subcategory: text("subcategory").notNull(),
  imageUrl: text("image_url").notNull(),
  mrp: integer("mrp").notNull(),
  discount: integer("discount").notNull(),
  finalPrice: integer("final_price").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const productCategories = {
  furniture: ['beds', 'sofas', 'chairs', 'almirahs'],
  electronics: ['laptops', 'smartphones', 'tablets', 'accessories']
} as const;
