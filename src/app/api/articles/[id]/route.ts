export const dynamic = 'force-static'
import { PrismaClient } from '../../../generated/prisma'
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10)
  console.log("get id", id)
  const result = await prisma.article.findUnique({
    where: {
      id: id
    },
    include: {
      categories: true,
      comments: true
    }
  });
  return NextResponse.json(result, { status: 200 })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10)
  const body = await request.json();

  const result = await prisma.article.update({
    where: {
      id: id
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })
  return NextResponse.json(result, { status: 200 })
}
