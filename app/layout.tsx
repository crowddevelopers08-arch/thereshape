import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

// The Merriweather font is loaded via the CSS @import in globals.css and applied
// within the scoped `.reshape` design system, so no next/font fetch is needed at
// build time.

export const metadata: Metadata = {
  title: "thereshape — Advanced Hair Trinity Program",
  description:
    "At thereshape, our Advanced Hair Trinity Program combines medical science, modern restoration technology and personalized care to reduce hair fall, improve density and restore healthier, stronger hair.",
  generator: "Nextjs15",
  icons: {
    icon: [
      { url: "https://ik.imagekit.io/aegfxmf0u/public/fav.png?updatedAt=1773306127826", sizes: "16x16", type: "image/png" },
      { url: "https://ik.imagekit.io/aegfxmf0u/public/fav.png?updatedAt=1773306127826", sizes: "32x32", type: "image/png" },
      { url: "https://ik.imagekit.io/aegfxmf0u/public/fav.png?updatedAt=1773306127826", sizes: "48x48", type: "image/png" },
      { url: "https://ik.imagekit.io/aegfxmf0u/public/fav.png?updatedAt=1773306127826", sizes: "192x192", type: "image/png" },
      { url: "https://ik.imagekit.io/aegfxmf0u/public/fav.png?updatedAt=1773306127826", sizes: "512x512", type: "image/png" }, 
    ],
    apple: [
      { url: "https://ik.imagekit.io/aegfxmf0u/public/fav.png?updatedAt=1773306127826", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "https://ik.imagekit.io/aegfxmf0u/public/fav.png?updatedAt=1773306127826",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        {/* Google Ads Tag */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18044684782"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18044684782');
            `,
          }}
        />
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WH34B7DF');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "w7wjr7yg42");
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WH34B7DF"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}