import type React from "react"
import type { Metadata } from "next"
import { Merriweather, Inter } from "next/font/google"
import "./globals.css"

// Merriweather is loaded and self-hosted via next/font so it doesn't depend on a
// runtime CSS @import (which Tailwind v4 / Lightning CSS can strip at build time).
// The family is exposed as the CSS variable --font-merriweather, consumed in globals.css.
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
})

// Inter is used for the hero headline (clean bold sans-serif) via --font-inter.
const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "thereshape — Advanced Hair Trinity Program",
  description:
    "At thereshape, our Advanced Hair Trinity Program combines medical science, modern restoration technology and personalized care to reduce hair fall, improve density and restore healthier, stronger hair.",
  generator: "Nextjs15",
  icons: {
    icon: [
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_xeajrt.png", sizes: "16x16", type: "image/png" },
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_xeajrt.png", sizes: "32x32", type: "image/png" },
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_xeajrt.png", sizes: "48x48", type: "image/png" },
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_xeajrt.png", sizes: "192x192", type: "image/png" },
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_xeajrt.png", sizes: "512x512", type: "image/png" }, 
    ],
    apple: [
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_xeajrt.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_xeajrt.png",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`antialiased ${merriweather.variable} ${inter.variable}`}>
      <head>

      </head>
      <body>

        {children}
      </body>
    </html>
  )
}