export const dynamic = 'force-static'
import { PrismaClient } from '../../generated/prisma'
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  const result = await prisma.article.findMany({
    include: {
      categories: true,
      comments: true
    }
  });

  return NextResponse.json(result, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { title, content, categoryIds = [] } = body

  const result = await prisma.article.create({
    data: {
      title,
      content,
      categories: {
        connect: categoryIds.map((id: number) => ({ id })),
      },
    },
  });

  return NextResponse.json(result, { status: 200 });
}