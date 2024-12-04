export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import { NextRequest, NextResponse } from 'next/server'
import { getPost } from '@/lib/prisma/api'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id)
    const [data, sequenceId] = await getPost(id)
    return NextResponse.json({ sequenceId, data })
  } catch (error) {
    return NextResponse.json({ message: 'failed to get post', error }, { status: 500 })
  }
}
