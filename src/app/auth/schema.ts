import { z } from "zod";

export const logInSchema = z.object({
  email: z.string().regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, {
    message: "Invalid Email Address",
  }),

  password: z.string().min(5, "Kulang yan bai").max(10, "Sumosobra kana bai"),
});

export type TLogIn = z.infer<typeof logInSchema>;

export const SignUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z
      .string()
      .min(8, "Kulang bai HAHHAA")
      .max(100, "Sumusobra kanaaaa"),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password needs to match",
    path: ["confirmPassword"],
  });

export type TSignUp = z.infer<typeof SignUpSchema>;
