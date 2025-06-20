import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ labelId: string }> }
) {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not defined");

    const sql = neon(url);

    const { labelId } = await params;

    const response = await sql`
      SELECT note.id, note.title, note.note, note.colortheme, label.label_name, note.label_id 
      FROM note 
      LEFT JOIN label ON note.label_id = label.id 
      WHERE note.label_id = ${labelId}
    `;

    return NextResponse.json({ notes: response }, { status: 200 });
  } catch (err) {
    throw Error(`${err}`);
  }
}
