import { NextResponse, NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";
import { findUserByEmail } from "../user-action";
import { signJwt } from "@/app/auth/jwt";
import { hashPassword } from "@/app/auth/core/passwordHasher";
import { generateRandomSalt } from "@/app/auth/core/passwordHasher";

export async function POST(req: NextRequest) {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not defined");

    const sql = neon(url);

    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing Values" }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user)
      return NextResponse.json({ error: "Email does not exsit", status: 401 });
  } catch (error) {
    console.error(`${error}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
