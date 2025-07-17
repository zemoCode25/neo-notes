import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
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

    const hashedPassword = await hashPassword(password, generateRandomSalt());

    const result =
      await sql`INSERT INTO "user" (email, password) VALUES (${email}, ${hashedPassword}) RETURNING id`;

    const userID = result[0]?.id;

    const token = await signJwt({
      email: email,
      userID: userID,
    });

    console.log(token, "token");

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    console.log(response.cookies, "cookies");

    return response;
  } catch (error) {
    console.error(`${error}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
