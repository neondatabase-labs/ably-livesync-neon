export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import { NextRequest, NextResponse } from 'next/server'
import { withOutboxWrite, editComment, deleteComment } from '@/lib/prisma/api'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id)
    const comment: { mutationId: string; content: string } = await request.json()
    const data = await withOutboxWrite(editComment, comment.mutationId, id, comment.content)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('failed to update comment', error)
    return NextResponse.json({ message: 'failed to update comment', error }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id)
    const mutationId = request.headers.get('x-mutation-id') || 'missing'
    const data = await withOutboxWrite(deleteComment, mutationId, id)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('failed to delete comment', error)
    return NextResponse.json({ message: 'failed to delete comment', error }, { status: 500 })
  }
}
