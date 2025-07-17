import { verifyJwt } from "@/app/auth/jwt";
import { cookies } from "next/headers";

export async function GET() {
  const tokenCookie = (await cookies()).get("token");

  console.log("Token value:", tokenCookie?.value);

  if (!tokenCookie) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const payload = await verifyJwt(tokenCookie.value); // your function to verify the JWT
    return Response.json({ message: "Valid cookie", user: payload });
  } catch (err) {
    return Response.json({ error: `${err}` }, { status: 403 });
  }
}
