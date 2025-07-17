import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw Error("Missing db");
    }

    const sql = neon(url);

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const result = await sql`SELECT * FROM "user" WHERE email = ${email}`;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
