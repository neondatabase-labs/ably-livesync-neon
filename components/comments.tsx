'use client'

import Comment from '@/components/comment'
import CommentPlaceholder from '@/components/comment-placeholder'
import type { Comment as CommentType } from '@/lib/prisma/api'
import { Suspense } from 'react'

type CommentsProps = {
  comments: CommentType[]
  onEdit: (id: number, content: string) => void
  onDelete: (id: number) => void
}

export default function ({ comments, onEdit, onDelete }: CommentsProps) {
  return (
    <div id="comments-section" className="flex flex-col max-h-[300px] overflow-y-scroll my-4 gap-y-4 divide-y divide-gray-600">
      {comments
        .sort((a, b) => (new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1))
        .map((comment) => (
          <Suspense key={comment.id} fallback={<CommentPlaceholder />}>
            <Comment comment={comment} onEdit={(content) => onEdit(comment.id, content)} onDelete={() => onDelete(comment.id)} />
          </Suspense>
        ))}
    </div>
  )
}
