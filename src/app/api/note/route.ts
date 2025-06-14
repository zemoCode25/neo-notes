import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");

  const sql = neon(url);
  const response = await sql`SELECT * FROM note`;

  return NextResponse.json({ notes: response }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");

  const sql = neon(url);
  const body = await req.json();
  const { title, note } = body;

  await sql`INSERT INTO note (title, note) VALUES (${title}, ${note})`;
  return NextResponse.json({ message: "Note saved!" }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");

  const sql = neon(url);
  const body = await req.json();
  const { title, note, id } = body;

  await sql`UPDATE note set title = ${title}, note = ${note} WHERE id = ${id}`;
  return NextResponse.json({ message: "Note saved!" }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");

  const sql = neon(url);
  const body = await req.json();
  const { id } = body;

  await sql`DELETE FROM note WHERE id = ${id}`;
  return NextResponse.json({ success: true }, { status: 200 });
}
