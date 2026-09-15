"use client"

import { useEffect, useRef, useState } from "react"
import { track } from "@/components/reshape/track"

/* Leads are saved to our database and pushed to TeleCRM via this API route. */
const LEAD_ENDPOINT = "/api/leads"
const BRANCH = "Dermetabience Clinic"

export default function AssessmentForm() {
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

    const payload = {
      name: raw.name,
      phone: raw.phone,
      location: raw.city,
      area: raw.concern,
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
    <section id="assessment-form" className="scroll-mt-[100px] bg-white px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-[560px]">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          className="flex flex-col justify-center rounded-[22px] border border-[#e7ecf3] bg-white p-6 shadow-[0_12px_34px_-16px_rgba(34,57,95,0.18)] sm:p-8"
        >
          {!done ? (
            <div>
              <div className="text-center">
                <h2 className="mt-2 text-[1.4rem] font-bold leading-[1.3] text-[#22395f] sm:text-[1.6rem]">
                   Book Your Consultation
                </h2>
              </div>

              <div className="mt-6">
              <Field label="Full name" htmlFor="af-name">
                <input
                  id="af-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={inputCls}
                />
              </Field>

              <Field label="Mobile number" htmlFor="af-phone">
                <input
                  id="af-phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  title="Enter a 10-digit mobile number starting with 6, 7, 8 or 9."
                  autoComplete="tel"
                  placeholder="10-digit number"
                  className={inputCls}
                />
              </Field>

              <Field label="City" htmlFor="af-city">
                <input
                  id="af-city"
                  name="city"
                  type="text"
                  required
                  autoComplete="address-level2"
                  placeholder="Your city"
                  className={inputCls}
                />
              </Field>

              <Field label="Your concern" htmlFor="af-concern">
                <select id="af-concern" name="concern" required className={inputCls} defaultValue="">
                  <option value="">Select a concern</option>
                  <option>Acne / Acne Scars</option>
                  <option>Pigmentation</option>
                  <option>Anti-Aging / Wrinkles</option>
                  <option>Hair Loss / Hair Fall</option>
                  <option>Skin Whitening / Glow</option>
                  <option>Not sure — need advice</option>
                </select>
              </Field>

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
                className="btn-wave mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#22395f] px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#16263f] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="relative z-10">{submitting ? "Booking…" : "Book Your Appointment"}</span>
              </button>
              <p className="mt-4 text-[0.75rem] leading-relaxed text-[#5f6f88]">
                By submitting, you agree to be contacted about your appointment. We never share your number.
              </p>
              </div>
            </div>
          ) : (
            <div className="px-2 py-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fef5ef] text-[1.6rem]">
                ✓
              </div>
              <h3 className="mb-2 text-[1.2rem] font-semibold text-[#22395f]">Booked. We&apos;ll call you shortly.</h3>
              <p className="text-[0.92rem] text-[#5f6f88]">
                Our team will reach you on the number you shared to confirm your slot.
              </p>
            </div>
          )}
        </form>
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
