export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import Footer from '@/components/footer'
import Post from '@/components/post'
import PostPlaceholder from '@/components/post-placeholder'
import { getPost, getRandomUser } from '@/lib/prisma/api'
import { Metadata } from 'next'
import { Suspense } from 'react'

const btoa = (str: string) => Buffer.from(str).toString('base64')

const config = {
  url: 'https://ably-livesync-neon.vercel.app',
  title: 'Real-time comments with Ably LiveSync and Postgres',
  description: 'A demo of how Ably LiveSync can be combined with a Serverless Postgres to power real-time comments.',
}

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  openGraph: {
    url: config.url,
    title: config.title,
    description: config.description,
    images: `https://neon.tech/docs/og?title=${btoa(config.title)}&breadcrumb=${btoa('Ably')}`,
  },
  twitter: {
    title: config.title,
    card: 'summary_large_image',
    description: config.description,
    images: `https://neon.tech/docs/og?title=${btoa(config.title)}&breadcrumb=${btoa('Ably')}`,
  },
}

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
