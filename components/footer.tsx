import Link from 'next/link'
import { GitHub, Linkedin, Twitter } from 'react-feather'

export default function () {
  return (
    <footer className="w-full pt-8 pb-2 flex flex-col items-center">
      <div className="flex flex-row w-full flex-wrap gap-2">
        <a
          target="_blank"
          aria-label="Deploy to Vercel"
          href="https://vercel.com/new/clone?repository-url=https://github.com/neondatabase-labs/ably-livesync-neon&env=DATABASE_URL,SESSION_SECRET,NEXT_PUBLIC_ABLY_API_KEY"
        >
          <img alt="Deploy to Vercel" loading="lazy" decoding="async" src="https://vercel.com/button" width="103" height="32" />
        </a>
        <a
          target="_blank"
          aria-label="Deploy to Netlify"
          href="https://app.netlify.com/start/deploy?repository=https://github.com/neondatabase-labs/ably-livesync-neon#DATABASE_URL&SESSION_SECRET&NEXT_PUBLIC_ABLY_API_KEY"
        >
          <img alt="Deploy to Netlify" loading="lazy" decoding="async" src="https://www.netlify.com/img/deploy/button.svg" width="179" height="32" className="h-[30px] w-auto" />
        </a>
        <a aria-label="Deploy to Render" href="https://render.com/deploy?repo=https://github.com/neondatabase-labs/ably-livesync-neon" target="_blank">
          <img
            width="153"
            height="40"
            loading="lazy"
            decoding="async"
            alt="Deploy to Render"
            className="h-[30px] w-auto rounded"
            src="https://render.com/images/deploy-to-render-button.svg"
          />
        </a>
      </div>
      <div className="mt-4 w-full flex text-gray-400 flex-row items-center justify-between">
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
