export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import Footer from '@/components/footer'
import Post from '@/components/post'
import PostPlaceholder from '@/components/post-placeholder'
import { getPost, getRandomUser } from '@/lib/prisma/api'
import { Suspense } from 'react'

export default async function () {
  const promises = await Promise.all([getPost(1), getRandomUser()]) 
  const [post] = promises[0]
  const user = promises[1]
  return (
    <div className="flex flex-col py-8 px-8 ml-8 max-w-xl">
      <h1 className="bg-gradient-to-br from-white via-[#CCCCCC] to-[#575757] bg-clip-text text-2xl font-medium tracking-tight text-transparent">
        Ably Postgres LiveSync (powered by Neon)
      </h1>
      <Suspense fallback={<PostPlaceholder />}>
        <Post user={user} post={post} />
      </Suspense>
      <Footer />
    </div>
  )
}
