// memorySchema.ts
import { z } from "zod";

export const memorySchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  content: z.string(),
  tags: z.array(z.string()),
  url: z.string().nullable(),
  isFavorite: z.boolean(),
  userId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const feedSchema = z.array(memorySchema); // array of memories

export type Memory = z.infer<typeof memorySchema>; // ✅ TypeScript type
