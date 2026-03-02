import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { TaskProvider } from '@/context/TaskContext'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaskFlow - Manage Your Tasks Efficiently',
  description: 'A modern to-do list application to help you organize and manage your tasks',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          <TaskProvider>
            {children}
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
