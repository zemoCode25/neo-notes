"use server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/app/auth/jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  if (!token) {
    return null;
  }

  const payload = await verifyJwt(token);
  if (!payload) {
    return null;
  }

  return payload;
}
