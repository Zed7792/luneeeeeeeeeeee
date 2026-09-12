import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientProviders } from "@/components/client-providers"
import OilservSidebar from "@/oilserv-sidebar"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OILSERV - Chemical Safety Management System",
  description: "Safety Data Sheet Library and Chemical Management",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#0ea5e9",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "OILSERV CSMS",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="OILSERV CSMS" />
        <link rel="apple-touch-icon" href="/images/icon-192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientProviders>
            <OilservSidebar>{children}</OilservSidebar>
          </ClientProviders>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
