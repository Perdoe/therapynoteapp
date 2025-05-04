// app/layout.tsx

"use client"

import type React from "react"
import type { Metadata } from "next"
import { Inter, Caveat } from "next/font/google"
import { useEffect } from "react"
import "./globals.css"
import { cn } from "@/lib/utils"
import { TherapistProvider } from "@/lib/context/therapist-context"
import { DevStorage } from "@/lib/dev-storage"

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
  // Initialize DevStorage at the application root
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Initializing DevStorage from layout component');
      DevStorage.initializeStorage();
    }
  }, []);

  return (
    <html lang="en">
      <body className={cn("min-h-screen font-sans antialiased", inter.variable, caveat.variable)}>
        <TherapistProvider>
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full z-50">
              Demo Mode
            </div>
          )}
          {children}
        </TherapistProvider>
      </body>
    </html>
  )
}