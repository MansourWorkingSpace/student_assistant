import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
  const { email, name, image, emailVerified } = await request.json();

  console.log("Google OAuth Response:", { email, name, image, emailVerified });


  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("User already exists:", existingUser);
    return NextResponse.json(existingUser, { status: 200 });
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      image,
      emailVerified: emailVerified ? new Date() : null, // Set the emailVerified field
    },
  });

  console.log("New User Created:", newUser);

  return NextResponse.json(newUser, { status: 201 });
}

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
