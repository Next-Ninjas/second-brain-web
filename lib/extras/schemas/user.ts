import { z } from "zod";

export const User = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  image: z.string().nullable().optional(),


  memoriesCount: z.number().optional(),
});

export type UserType = z.infer<typeof User>;
