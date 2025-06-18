import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");

  const sql = neon(url);
  const response = await sql`SELECT * FROM label ORDER BY id DESC`;

  return NextResponse.json({ labels: response }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not defined");
    const sql = neon(url);

    const body = await req.json();

    const { label_name } = body;

    if (!label_name) {
      throw new Error("Missing fields");
    }

    await sql`INSERT INTO label (label_name) VALUES (${label_name})`;

    return NextResponse.json({ success: true, label: body }, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
