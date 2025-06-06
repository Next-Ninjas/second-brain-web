import { z } from "zod";

export const memorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().nullable(),
  content: z.string(),
  url: z.string().url().nullable(),
  tags: z.array(z.string()),
  metadata: z.unknown().nullable(),
  isFavorite: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const feedSchema = z.array(memorySchema); // ✅ schema for array of memories

export type Memory = z.infer<typeof memorySchema>;
