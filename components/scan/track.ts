// Lightweight analytics helper.
// Pushes to dataLayer (GTM) and forwards Lead / Contact events to Meta Pixel
// when fbq is present.

declare global {
  interface Window {
    dataLayer?: unknown[]
    fbq?: (...args: unknown[]) => void
    // Defined by the Google Ads click-to-call snippet in app/layout.tsx.
    gtag_report_conversion?: (url?: string) => boolean
  }
}

export function track(name: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(Object.assign({ event: name }, data || {}))
  if (typeof window.fbq === "function") {
    if (name === "lead_submit") window.fbq("track", "Lead")
    if (name === "call_click" || name === "whatsapp_click") window.fbq("track", "Contact")
  }
  // Google Ads click-to-call conversion. Called without a url so the browser
  // handles the tel: navigation itself instead of waiting on event_callback.
  if (name === "call_click" && typeof window.gtag_report_conversion === "function") {
    window.gtag_report_conversion()
  }
}
