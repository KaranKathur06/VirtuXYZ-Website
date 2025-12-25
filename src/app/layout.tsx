import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AIConcierge from '@/components/ai/AIConcierge'
import { ThemeProvider } from '@/lib/theme-context'
import { QueryClientProvider } from '@/components/providers/QueryProvider'

const SITE_URL = 'https://www.virtuxyz.com'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VirtuXYZ - AI-Powered Real Estate Marketplace',
  description: 'Experience the future of real estate with AI-guided virtual tours, smart analytics, and immersive 3D property exploration',
  keywords: 'AI real estate, virtual tours, 3D property viewing, smart property search, real estate marketplace, UAE properties, Dubai real estate',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'VirtuXYZ - AI-Powered Real Estate Marketplace',
    description: 'Experience the future of real estate with AI-guided virtual tours, smart analytics, and immersive 3D property exploration',
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
        alt: 'VirtuXYZ',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VirtuXYZ',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" sizes="512x512" />
        <meta property="og:image" content={`${SITE_URL}/logo.png`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
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
