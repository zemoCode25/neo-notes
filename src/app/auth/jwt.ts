import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
import { TAuthPayload } from "../types/auth";

export async function signJwt(payload: TAuthPayload, expiry: string = "7d") {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(JWT_SECRET);

  return jwt;
}

export async function verifyJwt(token: string) {
  try {
    const payload = await jwtVerify(token, JWT_SECRET);
    return payload.payload;
  } catch {
    return null;
  }
}
