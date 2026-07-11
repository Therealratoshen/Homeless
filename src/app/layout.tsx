import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/layout/providers'
import { MainNav } from '@/components/layout/main-nav'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'PropertiPilihan — Platform Jual Beli Properti Indonesia',
    template: '%s | PropertiPilihan',
  },
  description:
    'Temukan rumah, apartemen, villa, dan tanah terbaik di seluruh Indonesia. PropertiPilihan — pilihan bijak untuk investasi properti Anda.',
  keywords: ['properti', 'jual rumah', 'beli rumah', 'apartemen', 'villa', 'tanah', 'Indonesia'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="flex flex-col min-h-full">
        <Providers>
          <MainNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
