import z from "zod";

export const RegisterUserSchema = z
  .object({
    name: z.string().min(1, "Please provide your name"),
    email: z.email("Please provide your email"),
    password: z.string().min(8, "password must be 8 characters"),
    confirmPassword: z.string().min(8, "password must be 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export const LoginUserSchema = z.object({
  email: z.email("Please provide your email"),
  password: z.string().min(8, "password must be 8 characters"),
});
