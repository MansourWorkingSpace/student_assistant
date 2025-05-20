import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const utilisateur = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!utilisateur) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }
  return NextResponse.json(utilisateur);
}

export async function UPDATE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const utilisateur = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!utilisateur)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const nouveauUtilisateur = await prisma.user.update({
    where: { id: utilisateur.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(nouveauUtilisateur);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const utilisateur = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!utilisateur)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  await prisma.user.delete({
    where: { id: params.id },
  });

  return NextResponse.json({});
}
