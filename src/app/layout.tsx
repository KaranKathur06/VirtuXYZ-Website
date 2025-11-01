import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AIConcierge from '@/components/ai/AIConcierge'
import { Providers } from '@/components/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VirtuXYZ - AI-Powered Real Estate Marketplace',
  description: 'Experience the future of real estate with AI-guided virtual tours, smart analytics, and immersive 3D property exploration',
  keywords: 'AI real estate, virtual tours, 3D property viewing, smart property search, real estate marketplace, UAE properties, Dubai real estate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <AIConcierge />
        </Providers>
      </body>
    </html>
  )
}
