"use server";
import { TSignUp } from "./schema";
import { logInSchema } from "./schema";
import { findUserByEmail } from "../api/user/user-action";
import { hashPassword } from "./core/passwordHasher";
import { generateRandomSalt } from "./core/passwordHasher";
import { createUserToDB } from "../api/user/user-action";
import { TUser } from "../types/user/user";

export async function signUp(unsafeData: TSignUp): Promise<string | undefined> {
  const { success, data } = logInSchema.safeParse(unsafeData);

  if (!success) {
    console.log("Invalid data", data);
    return "Invalid data";
  }

  const userEmailExist = await findUserByEmail(data?.email);
  console.log(userEmailExist, "userEmailExist");

  if (userEmailExist.exists) {
    return "Email already exists. Log in instead.";
  }

  const randomSalt = generateRandomSalt();

  const hashedPassword: string = await hashPassword(data.password, randomSalt);

  const userDetails: TUser = {
    email: data.email,
    hashedPassword: hashedPassword,
  };

  createUserToDB(userDetails);
}
