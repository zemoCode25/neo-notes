import { z } from "zod";

export const logInSchema = z.object({
  email: z.string().regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, {
    message: "Invalid Email Address",
  }),

  password: z.string().min(5, "Kulang yan bai").max(10, "Sumosobra kana bai"),
});

export type TLogIn = z.infer<typeof logInSchema>;
