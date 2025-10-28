export const dynamic = 'force-static'
import { PrismaClient } from '../../generated/prisma'
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  const result = await prisma.article.findMany();
  return NextResponse.json(result, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { category } = await request.json();

  const result = await prisma.category.create({
    data: {
      category,
    },
  });
  return NextResponse.json(result, { status: 200 });
}