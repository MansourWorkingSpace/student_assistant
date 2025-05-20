import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const notes = await prisma.note.findMany();
  return NextResponse.json(notes);
}

