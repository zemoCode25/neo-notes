import { z } from "zod";

export const userSchema = z
  .object({
    email: z.string().regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, {
      message: "Invalid Email Address",
    }),
    age: z.coerce
      .number({ message: "Please enter a number value" }) // Force it to be a number
      .int(),
    location: z.string(),
    password: z.string().min(5, "Kulang yan bai").max(10, "Sumosobra kana bai"),
  })
  .refine((data) => data?.password === "tanga", {
    message: "MALI NGANI",
    path: ["password"],
  });

export type User = z.infer<typeof userSchema>;
