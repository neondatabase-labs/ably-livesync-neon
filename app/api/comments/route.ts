export const runtime = 'edge'

export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import { NextRequest, NextResponse } from 'next/server'
import { withOutboxWrite, addComment } from '@/lib/prisma/api'

export async function POST(request: NextRequest) {
  try {
    const comment: {
      mutationId: string
      postId: number
      authorId: number
      content: string
    } = await request.json()
    const data = await withOutboxWrite(addComment, comment.mutationId, comment.postId, comment.authorId, comment.content)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('failed to add comment', error)
    return NextResponse.json({ message: 'failed to add comment', error }, { status: 500 })
  }
}
