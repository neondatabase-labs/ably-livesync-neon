import Link from 'next/link'
import { GitHub, Linkedin, Twitter } from 'react-feather'

export default function () {
  return (
    <footer className="w-full pt-4 pb-2 flex flex-col items-center">
      <div className="w-full flex text-gray-400 flex-row items-center justify-between">
        <div className="font-medium">
          Built with{' '}
          <a href="https://ably.com/docs/livesync/postgres/quickstart" className="font-medium text-purple-600 underline-offset-4 transition hover:text-gray-700 hover:underline">
            Ably LiveSync
          </a>{' '}
          and{' '}
          <a target="_blank" href="https://neon.tech" className="font-medium text-purple-600 underline-offset-4 transition hover:text-gray-700 hover:underline">
            Neon
          </a>
          .
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <Link href="https://www.linkedin.com/company/neondatabase" target="_blank" className="group">
            <Linkedin className="size-4 group-hover:fill-gray-200" />
          </Link>
          <Link href="https://x.com/neondatabase" target="_blank" className="group">
            <Twitter className="size-4 group-hover:fill-gray-200" />
          </Link>
          <Link href="https://github.com/neondatabase-labs/ably-livesync-neon" target="_blank" className="group">
            <GitHub className="size-4 group-hover:fill-gray-200" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
