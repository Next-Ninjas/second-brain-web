// lib/schemas/userProfileSchema.ts
import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().url().optional(),
  bio: z.string().max(150).optional(),
 
});
