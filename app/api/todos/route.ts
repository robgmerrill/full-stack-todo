import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  if (!title)
    return NextResponse.json({ error: "Title is required" }, { status: 400 });

  const todo = await prisma.todo.create({
    data: { title },
  });

  return NextResponse.json(todo, { status: 201 });
}
