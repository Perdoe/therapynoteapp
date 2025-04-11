import type React from "react"
import type { Metadata } from "next"
import { Inter, Caveat } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwritten",
})

export const metadata: Metadata = {
  title: "Sanare",
  description: "Ultra-minimal therapy documentation app",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen font-sans antialiased", inter.variable, caveat.variable)}>{children}</body>
    </html>
  )
}



import './globals.css'