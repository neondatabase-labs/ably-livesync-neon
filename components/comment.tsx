'use client'

import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useContext, useState, FormEvent } from 'react'
import { AuthorContext } from '@/context/author'
import { DEFAULT_AVATAR_URL } from '@/lib/image'
import type { Comment as CommentType } from '@/lib/prisma/api'

type CommentProps = {
  comment: CommentType
  onEdit: (content: string) => void
  onDelete: () => void
}

export default function Comment({ comment, onEdit, onDelete }: CommentProps) {
  const user = useContext(AuthorContext)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedComment, setEditedComment] = useState(comment.content)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setIsEditMode(false)
    onEdit(editedComment)
  }

  function onReset(e: FormEvent) {
    e.preventDefault()
    setIsEditMode(false)
    setEditedComment(comment.content)
  }

  return (
    <div className={`${comment.optimistic ? 'opacity-25' : ''} w-full`}>
      <div className="flex flex-col text-white">
        <div className="flex items-center py-3 w-screen max-w-full">
          <div className="flex flex-col space-x-4 pr-3">
            <Image src={comment.author.image || DEFAULT_AVATAR_URL} alt={comment.author.username} width={36} height={36} className="rounded-full ring-1 ring-gray-900/5" />
          </div>
          <p className="text-sm font-semibold">{comment.author.username}</p>
          <p className="ml-auto text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
          {comment.author.id === user?.id && (
            <>
              <PencilIcon className="ml-4 h-6 w-6 text-blue-300 hover:text-blue-500 hover:cursor-pointer" onClick={() => setIsEditMode(!isEditMode)} />
              <TrashIcon className="ml-4 h-6 w-6 text-red-300 hover:text-red-500 hover:cursor-pointer" onClick={onDelete} />
            </>
          )}
        </div>
        {isEditMode ? (
          <form className="space-y-1" onSubmit={onSubmit} onReset={onReset}>
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="w-full px-0 text-sm outline-none rounded-lg text-gray-200 bg-black"
            ></textarea>
            <button
              type="reset"
              className="inline-flex items-center py-2.5 px-4 mr-2 text-xs font-normal text-center text-gray-500 border rounded-lg focus:bg-gray-200 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:bg-blue-900 hover:bg-blue-800"
            >
              Save
            </button>
          </form>
        ) : (
          <div className="space-y-1">
            <p className="font-normal leading-none">{comment.content}</p>
          </div>
        )}
      </div>
    </div>
  )
}
