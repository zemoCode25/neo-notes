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

    const result =
      await sql`SELECT EXISTS (SELECT 1 FROM "user" WHERE email = ${email}) AS exists`;

    const exists = result[0].exists;

    return NextResponse.json({ exists });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
