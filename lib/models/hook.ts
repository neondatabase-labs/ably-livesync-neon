'use client'

import { useEffect, useState } from 'react'
import { Model, SyncReturnType } from '@ably-labs/models'
import { modelsClient } from './modelsClient'
import { merge } from '@/lib/models/mutations'
import type { Post as PostType } from '@/lib/prisma/api'

export type ModelType = Model<(id: number) => SyncReturnType<PostType>>

export async function getPost(id: number) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) throw new Error(`GET /api/posts/:id: ${response.status} ${JSON.stringify(await response.json())}`)
  const { sequenceId, data } = (await response.json()) as {
    sequenceId: string
    data: PostType
  }
  return { sequenceId, data }
}

export const useModel = (id: number | null): [PostType | undefined, ModelType | undefined] => {
  const [postData, setPostData] = useState<PostType>()
  const [model, setModel] = useState<ModelType>()

  useEffect(() => {
    if (!id) return
    const model: ModelType = modelsClient().models.get({
      channelName: `post:${id}`,
      sync: async () => getPost(id),
      merge,
    })
    setModel(model)
  }, [id])

  useEffect(() => {
    if (!id || !model) return
    const getPost = async (id: number) => await model.sync(id)
    getPost(id)
  }, [id, model])

  useEffect(() => {
    if (!model) return
    const subscribe = (err: Error | null, data?: PostType | undefined) => {
      if (err) return console.error(err)
      setPostData(data)
    }
    model.subscribe(subscribe)

    return () => model.unsubscribe(subscribe)
  }, [model])

  return [postData, model]
}
