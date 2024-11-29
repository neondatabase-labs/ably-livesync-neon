'use client'

import Image from 'next/image'
import { useState, useContext, FormEvent } from 'react'
import { AuthorContext } from '@/context/author'
import { DEFAULT_AVATAR_URL } from '@/lib/image'
import { Author as AuthorType } from '@/lib/prisma/api'

export default function NewComment({ onAdd }: { onAdd: (author: AuthorType, content: string) => void }) {
  const author = useContext(AuthorContext)
  const [comment, setComment] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!author) throw new Error('user is not set')
    onAdd(author, comment)
    setComment('')
    document.getElementById('comments-section')?.scroll(0, 0)
  }

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <div className="w-full rounded-lg border border-white/20">
        <div className="px-4 rounded-t-lg">
          <div className="flex items-center py-3">
            <div className="flex flex-col space-x-4 pr-3">
              <Image src={author?.image || DEFAULT_AVATAR_URL} alt={author?.username || 'avatar'} width={36} height={36} className="rounded-full ring-1 ring-gray-900/5" />
            </div>
            <p className="text-sm text-gray-400 font-semibold">{author?.username}</p>
          </div>
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            required
            rows={4}
            id="comment"
            value={comment}
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-0 text-sm text-white outline-none appearance-none bg-black"
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-400 hover:text-white bg-black rounded-lg border border-gray-600 hover:border-gray-100"
          >
            Post comment &rarr;
          </button>
        </div>
      </div>
    </form>
  )
}
