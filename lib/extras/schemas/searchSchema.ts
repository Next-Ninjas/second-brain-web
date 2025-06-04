import { z } from "zod";

export const memorySchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  url: z.string().url().nullable().optional(),
  isFavorite: z.boolean(),
  createdAt: z.string(), // If needed, use z.coerce.date() or z.string().datetime() for stricter validation
  updatedAt: z.string(),
});

export const searchSchema = z.array(memorySchema);
