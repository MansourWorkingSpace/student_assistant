import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  const { title, content } = await request.json();

  if (!email || !title || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const note = await prisma.note.create({
      data: {
        email,
        title,
        content,
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}
export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const notes = await prisma.note.findMany({
      where: {
        email,
      },
      orderBy: {
        createdAt: "desc", 
      },
    });
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  const { id, title, content } = await request.json();

  if (!email || !id || !title || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}
