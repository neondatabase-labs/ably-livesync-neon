'use client'

import AlertContainer from '@/components/alert'
import Comments from '@/components/comments'
import NewComment from '@/components/new-comment'
import { AlertProvider, useAlert } from '@/context/alert'
import { AuthorProvider } from '@/context/author'
import { useModel } from '@/lib/models/hook'
import { addComment, deleteComment, editComment } from '@/lib/models/mutations'
import type { Author as AuthorType, Post as PostType } from '@/lib/prisma/api'
import Ably from 'ably'
import { AblyProvider } from 'ably/react'
import { v4 as uuidv4 } from 'uuid'
import PostPlaceholder from './post-placeholder'

function Post({ post: initialPost }: { post: PostType }) {
  const { setAlert } = useAlert()
  const [post, model] = useModel(initialPost.id)

  if (!model || !post) return <PostPlaceholder />

  async function onAdd(author: AuthorType, postId: number, content: string) {
    if (!model) return
    const mutationId = uuidv4()
    const [confirmed, cancel] = await model.optimistic({
      mutationId: mutationId,
      name: 'addComment',
      data: { id: uuidv4(), postId, author, content, optimistic: true, createdAt: Date.now() },
    })
    setAlert('Optimistically added comment', 'info')
    try {
      await addComment(mutationId, author, postId, content)
      await confirmed
      setAlert('Add comment confirmed!', 'success')
    } catch (err) {
      setAlert(`Error adding comment: ${err}`, 'error')
      cancel()
    }
  }

  async function onEdit(commentId: number, content: string) {
    if (!model || !post) return
    const mutationId = uuidv4()
    const editedComment = { ...post.comments.findLast((c) => c.id === commentId)!, content: content, optimistic: true }
    const [confirmed, cancel] = await model.optimistic({
      mutationId: mutationId,
      name: 'editComment',
      data: editedComment,
    })
    setAlert('Optimistically edited comment', 'info')
    try {
      await editComment(mutationId, commentId, content)
      await confirmed
      setAlert('Edit comment confirmed!', 'success')
    } catch (err) {
      setAlert(`Error editing comment: ${err}`, 'error')
      cancel()
    }
  }

  async function onDelete(commentId: number) {
    if (!model) return
    const mutationId = uuidv4()
    const [confirmed, cancel] = await model.optimistic({
      mutationId: mutationId,
      name: 'deleteComment',
      data: { id: commentId },
    })
    setAlert('Optimistically deleted comment', 'info')

    try {
      await deleteComment(mutationId, commentId)
      await confirmed
      setAlert('Delete comment confirmed!', 'success')
    } catch (err) {
      setAlert(`Error deleting comment: ${err}`, 'error')
      cancel()
    }
  }

  return (
    <>
      <Comments comments={post.comments} onEdit={onEdit} onDelete={onDelete} />
      <NewComment onAdd={(author, content) => onAdd(author, post.id, content)} />
    </>
  )
}

export default function PostWrapper({ user, post: initialPost }: { user: AuthorType; post: PostType }) {
  const client = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY })
  return (
    <AblyProvider client={client}>
      <AuthorProvider author={user}>
        <AlertProvider>
          <AlertContainer />
          <Post post={initialPost} />
        </AlertProvider>
      </AuthorProvider>
    </AblyProvider>
  )
}
