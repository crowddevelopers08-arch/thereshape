"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { track } from "./track"

/**
 * Promo popup — the CtaBand design, but with a looping video instead of the
 * image. It renders nothing inline; a timer opens it as a modal every 30s.
 * Mount it once (see page.tsx) alongside BookingModal.
 *
 * Drop your promo clip at /public/promo.mp4 (poster falls back to https://res.cloudinary.com/n0ccg2u6/image/upload/cta_udfkkp.png).
 */
const INTERVAL_MS = 30_000

export default function CtaPopup() {
  const [open, setOpen] = useState(false)

  // re-open every 30 seconds
  useEffect(() => {
    const id = setInterval(() => setOpen(true), INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  // lock scroll + close on Escape while open
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="reshape fixed inset-0 z-[120] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="New Advanced Hair Trinity Program"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-[#16263f]/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* card */}
      <div className="rise relative w-full max-w-[820px] overflow-hidden rounded-[22px] bg-gradient-to-r from-[#fccbb6] to-[#fef1ea] shadow-[0_40px_90px_-30px_rgba(34,57,95,0.6)]">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#22395f] shadow-md transition-all hover:scale-105 hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 items-center md:grid-cols-[1.55fr_1fr]">
          {/* LEFT — copy + button */}
          <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
            <h2 className="text-[clamp(1.5rem,3.4vw,2.5rem)] font-bold leading-[1.1] text-[#22395f]">
              New Advanced Hair Trinity Program
            </h2>
            <p className="mt-3 flex flex-wrap gap-x-2.5 gap-y-1 text-[0.95rem] font-medium text-[#22395f]/75">
              <span>Personalized</span>
              <span className="text-[#22395f]/40">•</span>
              <span>Effective Treatment</span>
              <span className="text-[#22395f]/40">•</span>
              <span>Advanced Hair Regrowth</span>
            </p>
            <a
              href="#book"
              onClick={() => {
                track("book_click", { branch: "Reshape Clinic", source: "cta_popup" })
                setOpen(false)
              }}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#22395f] px-7 py-3.5 text-[0.9rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#16263f]"
            >
              Book Your Consultation
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* RIGHT — looping video (mobile: full-width banner; desktop: diagonal cut) */}
          <div className="relative h-52 w-full sm:h-60 md:h-full md:min-h-[240px]">
            <video
              src="https://res.cloudinary.com/n0ccg2u6/video/upload/video_v1jsnd.mp4"
              poster="https://res.cloudinary.com/n0ccg2u6/image/upload/cta_udfkkp.png"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
