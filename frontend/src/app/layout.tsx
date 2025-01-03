'use client'

import { Header } from '@/components/Header'
import { AbstractWalletProvider } from "@abstract-foundation/agw-react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'leaflet/dist/leaflet.css'
import './globals.css'

const queryClient = new QueryClient()

const abstractConfig = {
  testnet: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AbstractWalletProvider config={abstractConfig}>
            <Header />
            {children}
          </AbstractWalletProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}