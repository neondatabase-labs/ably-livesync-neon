'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function () {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => router.refresh())}
      className={`${isPending ? 'cursor-not-allowed text-gray-400' : ''} text-sm text-gray-500 hover:text-gray-900`}
    >
      {isPending ? 'Refreshing...' : 'Refresh'}
    </button>
  )
}
