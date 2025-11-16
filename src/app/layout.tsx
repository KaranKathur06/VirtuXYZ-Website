import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AIConcierge from '@/components/ai/AIConcierge'
import { ThemeProvider } from '@/lib/theme-context'
import { QueryClientProvider } from '@/components/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VirtuXYZ - AI-Powered Real Estate Marketplace',
  description: 'Experience the future of real estate with AI-guided virtual tours, smart analytics, and immersive 3D property exploration',
  keywords: 'AI real estate, virtual tours, 3D property viewing, smart property search, real estate marketplace, UAE properties, Dubai real estate',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <QueryClientProvider>
          <ThemeProvider>
            {children}
            <AIConcierge />
            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'glass',
                style: {
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                },
              }}
            />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
