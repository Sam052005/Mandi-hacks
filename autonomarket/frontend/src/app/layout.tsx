import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/ui/Header'

export const metadata: Metadata = {
  title: 'AutonoMarket - Autonomous E-Commerce',
  description: 'Agentic e-commerce managed by Cerebrum Human-in-the-loop Governance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
