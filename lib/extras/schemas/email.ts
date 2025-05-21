import { z } from "zod";

export const emailSchema = z.string().email();
export const nameSchema = z
  .string()
    .min(1, "Name must be at least 2 characters long");
  
    export const passwordSchema = z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
  
