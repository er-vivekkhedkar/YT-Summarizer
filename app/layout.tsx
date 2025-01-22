import './globals.css'
import { Inter } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ThemeProvider } from "@/components/ui/theme-provider"
import NhostClientProvider from '@/components/nhost-provider'
import { Toaster } from 'react-hot-toast'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YT Summarizer',
  description: 'AI-powered YouTube video summarizer',
  // Add other metadata as needed
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NhostClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </ThemeProvider>
        </NhostClientProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}

