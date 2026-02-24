import { ReactNode } from 'react'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Next Shop',
  description: 'Simple demo shop built with Next.js'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}
      >
        <header className="border-b border-gray-800 bg-gray-900/70 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-semibold">
              Next Shop
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-yellow-300 transition-colors">
                Home
              </Link>
              <Link href="/products" className="hover:text-yellow-300 transition-colors">
                Products
              </Link>
              <Link href="/cart" className="hover:text-yellow-300 transition-colors">
                Cart
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-10">{children}</main>
      </body>
    </html>
  )
}
