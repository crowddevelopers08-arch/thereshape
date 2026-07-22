"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LuX } from "react-icons/lu"
import { track } from "./track"

/* Leads are saved to our database and pushed to TeleCRM via this API route. */
const LEAD_ENDPOINT = "/api/leads"
const BRANCH = "Reshape Clinic"

/**
 * Booking form as a global popup. Any `<a href="#book">` CTA anywhere on the
 * page opens it (clicks are intercepted document-wide), so the inline booking
 * section is no longer needed.
 */
export default function BookingModal() {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // open on any "#book" CTA click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      const link = el?.closest?.('a[href="#book"]')
      if (link) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  // esc to close + lock background scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  // campaign attribution — filled from the URL when the modal opens
  useEffect(() => {
    if (!open) return
    const form = formRef.current
    if (!form) return
    const q = new URLSearchParams(window.location.search)
    ;["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"].forEach((k) => {
      const input = form.querySelector<HTMLInputElement>(`[name="${k}"]`)
      if (input) input.value = q.get(k) || ""
    })
    const pageUrl = form.querySelector<HTMLInputElement>('[name="page_url"]')
    if (pageUrl) pageUrl.value = window.location.href
  }, [open])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setSubmitting(true)
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    const payload = {
      name: raw.name,
      phone: raw.phone,
      area: raw.concern,
      duration: raw.since,
      branch: raw.branch || BRANCH,
      source: raw.utm_source || "direct",
      medium: raw.utm_medium || "",
      campaign: raw.utm_campaign || "",
      pageUrl: raw.page_url || (typeof window !== "undefined" ? window.location.href : ""),
    }

    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Request failed with ${res.status}`)

      track("lead_submit", { branch: BRANCH, concern: raw.concern })
      window.location.href = "/thank-you"
    } catch {
      setSubmitting(false)
      alert("That did not go through. Please call +91 86085 51555 instead.")
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-[#16263f]/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book your consultation"
            className="relative z-10 flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* header */}
            <div className="relative flex-none bg-[#22395f] px-6 py-6 text-white">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <LuX className="h-5 w-5" />
              </button>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[#fccbb6]">
                New Advanced Hair Trinity Program
              </span>
              <h3 className="mt-3 display text-[1.5rem] font-bold text-white">Book Your Consultation</h3>
              <p className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[0.82rem] text-white/70">
                <span>Personalized</span>
                <span className="text-[#fccbb6]">•</span>
                <span>Effective Treatment</span>
                <span className="text-[#fccbb6]">•</span>
                <span>Advanced Hair Regrowth</span>
              </p>
            </div>

            {/* form */}
            <div className="overflow-y-auto px-6 py-6">
              <form ref={formRef} onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="m-name">
                    <input id="m-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={inputCls} />
                  </Field>
                  <Field label="Mobile number" htmlFor="m-phone">
                    <input
                      id="m-phone"
                      name="phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      pattern="[6-9][0-9]{9}"
                      autoComplete="tel"
                      placeholder="10-digit number"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                  <Field label="Your hair concern" htmlFor="m-concern">
                    <select id="m-concern" name="concern" required className={inputCls} defaultValue="">
                      <option value="">Select a concern</option>
                      <option>Hair Regrowth</option>
                      <option>Hair Loss / Hair Fall</option>
                      <option>Baldness / Receding Hairline</option>
                      <option>Hair Thinning</option>
                      <option>Scalp Health</option>
                      <option>Not sure — need advice</option>
                    </select>
                  </Field>
                  <Field label="How long has it been?" htmlFor="m-since">
                    <select id="m-since" name="since" required className={inputCls} defaultValue="">
                      <option value="">Select duration</option>
                      <option>Under 3 months</option>
                      <option>3 to 12 months</option>
                      <option>Over a year</option>
                    </select>
                  </Field>
                </div>

                {/* campaign attribution — filled automatically */}
                <input type="hidden" name="utm_source" />
                <input type="hidden" name="utm_medium" />
                <input type="hidden" name="utm_campaign" />
                <input type="hidden" name="utm_content" />
                <input type="hidden" name="utm_term" />
                <input type="hidden" name="fbclid" />
                <input type="hidden" name="gclid" />
                <input type="hidden" name="branch" defaultValue={BRANCH} />
                <input type="hidden" name="page_url" />

                <button type="submit" disabled={submitting} className="btn btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70">
                  {submitting ? "Booking…" : "Book Your Consultation"}
                </button>

                <p className="mt-3 text-center text-[0.8rem] text-[#5f6f88]">
                  Prefer to talk now? Call{" "}
                  <a
                    href="tel:+918608551555"
                    onClick={() => track("call_click", { branch: BRANCH })}
                    className="font-bold text-[#22395f]"
                  >
                    +91 86085 51555
                  </a>
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const inputCls =
  "w-full rounded-xl border border-[#e7ecf3] bg-[#fbf8f5] px-4 py-3 text-[0.95rem] text-[#1f2f47] transition-all duration-150 focus:border-[#22395f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fccbb6]"

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="mb-2 block text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#5f6f88]">
        {label}
      </label>
      {children}
    </div>
  )
}
