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
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_kiluez.png", sizes: "16x16", type: "image/png" },
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_kiluez.png", sizes: "32x32", type: "image/png" },
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_kiluez.png", sizes: "48x48", type: "image/png" },
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_kiluez.png", sizes: "192x192", type: "image/png" },
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_kiluez.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_kiluez.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "https://res.cloudinary.com/n0ccg2u6/image/upload/favlogo_kiluez.png",
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NSSBBXNJ');
            `
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) — Google Ads */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18327451312" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-18327451312');
            `
          }}
        />

        {/* Event snippet for Click to call conversion — call gtag_report_conversion on tel: clicks */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-18327451312/yvEJCNeCydkcELDtmqNE',
                    'value': 1.0,
                    'currency': 'INR',
                    'event_callback': callback
                });
                return false;
              }
            `
          }}
        />

        {/* Call tracking — swaps the displayed phone number for a Google forwarding number */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', 'AW-18327451312/FBHhCNqCydkcELDtmqNE', {
                'phone_conversion_number': '+91 86085 51555'
              });
            `
          }}
        />
        {/* End Google Ads tags */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NSSBBXNJ"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {children}
      </body>
    </html>
  )
}