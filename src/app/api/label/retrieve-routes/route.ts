import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not defined");
    const sql = neon(url);

    const { searchParams } = new URL(req.url);
    const last = searchParams.get("last");

    let result;

    if (last) {
      result = await sql`SELECT id FROM label ORDER BY id DESC LIMIT 1`;
    }

    return NextResponse.json({ id: result }, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
