import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
export async function POST(req: NextRequest) {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not defined");

    const sql = neon(url);

    const body = await req.json();

    const { email, hashedPassword } = body;

    if (!email || !hashedPassword) {
      return NextResponse.json({ error: "Missing Values" }, { status: 400 });
    }

    await sql`INSERT INTO "user" (email, password) VALUES (${email}, ${hashedPassword})`;
  } catch (error) {
    console.error(`${error}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
