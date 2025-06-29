import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");

  const sql = neon(url);
  const response =
    await sql`SELECT note.id, note.title, note.note, note.colortheme, label.label_name, note.label_id FROM note LEFT JOIN label ON note.label_id = label.id WHERE note.user_id = 1 ORDER BY note.id DESC`;

  return NextResponse.json({ notes: response }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not defined");

    const sql = neon(url);
    const body = await req.json();
    const { title, note, colorTheme, label_id } = body;

    if (!title || !note || !colorTheme) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await sql`INSERT INTO note (title, note, colortheme, label_id) VALUES (${title}, ${note}, ${colorTheme}, ${label_id})`;
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
  const { title, note, id, colortheme, label_id } = body;

  await sql`UPDATE note set title = ${title}, note = ${note}, colorTheme = ${colortheme}, label_id = ${label_id} WHERE id = ${id}`;
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
