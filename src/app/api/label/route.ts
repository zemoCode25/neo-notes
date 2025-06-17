import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");

  const sql = neon(url);
  const response = await sql`SELECT * FROM label ORDER BY id DESC`;

  return NextResponse.json({ labels: response }, { status: 200 });
}
