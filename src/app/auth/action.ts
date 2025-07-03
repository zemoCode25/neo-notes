import { TSignUp } from "./schema";
import { logInSchema } from "./schema";
import { findUserByEmail } from "../api/user/user-action";

export async function signUp(unsafeData: TSignUp): Promise<string | undefined> {
  const { success, data } = logInSchema.safeParse(unsafeData);

  if (!success) {
    console.log("Invalid data", data);
    return "Invalid data";
  }

  const userEmailExist = await findUserByEmail(data?.email);
  console.log(userEmailExist, "userEmailExist");

  if (!userEmailExist.exists) {
    return "ULOL WALA NAMAN EH AHAHHAHAH";
  }
}
