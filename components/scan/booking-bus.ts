/**
 * Tiny event bus that lets any CTA on the scan page open the booking modal
 * without prop-drilling or a context provider. The modal listens for this
 * event; `openBooking()` is the only thing callers need to import, so a button
 * never pulls the whole chat flow into its bundle.
 */
export const OPEN_BOOKING_EVENT = "scan:open-booking"

export function openBooking() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(OPEN_BOOKING_EVENT))
}
