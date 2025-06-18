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

export async function PUT(req: NextRequest) {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not defined");

    const sql = neon(url);
    const body = await req.json();
    const { id, label_name } = body;

    if (!id || !label_name) {
      return NextResponse.json(
        { error: "Label ID and name are required" },
        { status: 400 }
      );
    }

    await sql`UPDATE label set label_name = ${label_name} WHERE id = ${id}`;
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
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

    await sql`DELETE FROM label WHERE id = ${id}`;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
