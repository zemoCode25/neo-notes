import { TUser } from "@/app/types/user/user";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function findUserByEmail(email: string | undefined) {
  try {
    const response = await fetch(
      `${API_URL}/api/user/retrieve?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw Error("Error in request");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw Error(`${error}`);
  }
}

export async function createUserToDB(userDetails: TUser) {
  try {
    const response = await fetch(`${API_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (!response.ok) {
      throw Error("Error in request");
    }
    const result = await response.json();
    if (!result.success) {
      throw Error(result.error || "Failed to create user");
    }

    return result;
  } catch (error) {
    throw Error(`${error}`);
  }
}
