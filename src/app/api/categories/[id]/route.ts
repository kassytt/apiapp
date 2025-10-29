export const dynamic = 'force-static'
import { PrismaClient } from '../../../generated/prisma'
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10)
  const result = await prisma.category.findUnique({
    where: {
      id: id
    }
  });
  return NextResponse.json(result, { status: 200 })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10)
  const body = await request.json();

  const result = await prisma.category.update({
    where: {
      id: id
    },
    data: {
      category: body.category,
    }
  })
  return NextResponse.json(result, { status: 200 })
}
