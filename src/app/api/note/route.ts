import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");

  const sql = neon(url);
  const response = await sql`SELECT * FROM note ORDER BY id DESC`;

  return NextResponse.json({ notes: response }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not defined");

    const sql = neon(url);
    const body = await req.json();
    const { title, note, colorTheme } = body;

    if (!title || !note || !colorTheme) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await sql`INSERT INTO note (title, note, colortheme) VALUES (${title}, ${note}, ${colorTheme})`;
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");

  const sql = neon(url);
  const body = await req.json();
  const { title, note, id, colortheme } = body;

  await sql`UPDATE note set title = ${title}, note = ${note}, colorTheme = ${colortheme} WHERE id = ${id}`;
  return NextResponse.json({ message: "Note saved!" }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not defined");

    const sql = neon(url);
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    await sql`DELETE FROM note WHERE id = ${id}`;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
