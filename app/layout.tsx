import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={[inter.variable, 'bg-black flex flex-col items-center justify-center'].join(' ')}>{children}</body>
    </html>
  )
}
