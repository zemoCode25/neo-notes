import { TLogIn } from "./schema";
import { logInSchema } from "./schema";

export async function signUp(unsafeData: TLogIn) {
  const { success, data } = logInSchema.safeParse(unsafeData);

  if (success) {
    console.log("AYEEE TRUETO");
  } else {
    console.log(data);
  }
}
