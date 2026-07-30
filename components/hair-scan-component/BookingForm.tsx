"use client"

import { useEffect, useRef, useState } from "react"
import Reveal from "./Reveal"
import { track } from "./track"

/* Leads are saved to our database and pushed to TeleCRM via this API route. */
const LEAD_ENDPOINT = "/api/leads"
const BRANCH = "Reshape Clinic"

export default function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // campaign attribution — filled automatically from the URL
  useEffect(() => {
    const form = formRef.current
    if (!form) return
    const q = new URLSearchParams(window.location.search)
    ;["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"].forEach((k) => {
      const el = form.querySelector<HTMLInputElement>(`[name="${k}"]`)
      if (el) el.value = q.get(k) || ""
    })
    const pageUrl = form.querySelector<HTMLInputElement>('[name="page_url"]')
    if (pageUrl) pageUrl.value = window.location.href
  }, [])

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

    // Map form fields to the /api/leads payload shape.
    const payload = {
      name: raw.name,
      phone: raw.phone,
      email: raw.email,
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
      setDone(true)
      window.location.href = "/thank-you"
    } catch {
      setSubmitting(false)
      alert("That did not go through. Please call +91 86085 51555 instead.")
    }
  }

  return (
    <section id="book" className="relative scroll-mt-[80px] overflow-hidden bg-[#22395f] py-14 sm:py-16 lg:py-20">
      <div className="aurora opacity-30" aria-hidden>
        <span className="a1" />
        <span className="a2" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 items-start gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#fccbb6]">
            New Advanced Hair Trinity Program
          </p>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] text-white">Book Your Consultation</h2>
          <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[1rem] font-medium text-white/75">
            <span>Personalized</span>
            <span className="text-[#fccbb6]">•</span>
            <span>Effective Treatment</span>
            <span className="text-[#fccbb6]">•</span>
            <span>Advanced Hair Regrowth</span>
          </p>

          <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
            <p className="text-[0.9rem] text-white/80">
              Call{" "}
              <a
                href="tel:+918608551555"
                onClick={() => track("call_click", { branch: BRANCH })}
                className="font-bold text-[#fccbb6]"
              >
                +91 86085 51555
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal index={1}>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className="rounded-[22px] border border-[#e7ecf3] bg-white p-6 sm:p-8"
          >
            {!done ? (
              <div>
                <h3 className="mb-6 text-[1.15rem] text-[#22395f]">Book Your Consultation</h3>

                <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="f-name">
                    <input
                      id="f-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Mobile number" htmlFor="f-phone">
                    <input
                      id="f-phone"
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

                <Field label="Email address" htmlFor="f-email">
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </Field>

                <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                  <Field label="Your hair concern" htmlFor="f-concern">
                    <select id="f-concern" name="concern" required className={inputCls} defaultValue="">
                      <option value="">Select a concern</option>
                      <option>Hair Regrowth</option>
                      <option>Hair Loss / Hair Fall</option>
                      <option>Baldness / Receding Hairline</option>
                      <option>Hair Thinning</option>
                      <option>Scalp Health</option>
                      <option>Not sure — need advice</option>
                    </select>
                  </Field>
                  <Field label="How long has it been?" htmlFor="f-since">
                    <select id="f-since" name="since" required className={inputCls} defaultValue="">
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

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-wave mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative z-10">{submitting ? "Booking…" : "Book Your Consultation"}</span>
                </button>
                <p className="mt-4 text-[0.75rem] leading-relaxed text-[#5f6f88]">
                  By submitting, you agree to be contacted by thereshape about your appointment. We never share your
                  number.
                </p>
              </div>
            ) : (
              <div className="px-2 py-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fef5ef] text-[1.6rem]">
                  ✓
                </div>
                <h3 className="mb-2 text-[1.2rem] text-[#22395f]">Booked. We&apos;ll call you shortly.</h3>
                <p className="text-[0.92rem] text-[#5f6f88]">
                  Our team will reach you on the number you shared to confirm your slot.
                </p>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
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
