import crypto from "crypto";
import { hashPassword } from "./passwordHasher";

export async function comparePasswords({
  inputPassword,
  hashedPassword,
  salt,
}: {
  inputPassword: string;
  hashedPassword: string;
  salt: string;
}) {
  const inputHashedPassword = await hashPassword(inputPassword, salt);

  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword, "hex"),
    Buffer.from(hashedPassword, "hex")
  );
}
