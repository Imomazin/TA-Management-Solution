import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ status: 'ok' })
  } catch (e) {
    return NextResponse.json({ status: 'db-error', error: String(e) }, { status: 500 })
  }
}
