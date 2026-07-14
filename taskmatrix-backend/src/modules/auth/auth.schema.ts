import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50),

    email: z.email(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

export const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(1),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export type LoginDto = z.infer<typeof loginSchema>;