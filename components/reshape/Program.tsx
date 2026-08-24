"use client"

import { useEffect, useRef, useState } from "react"
import { LuSyringe, LuDroplet, LuZap, LuChevronLeft, LuChevronRight } from "react-icons/lu"
import Reveal from "./Reveal"
import { track } from "./track"

const LEAD_ENDPOINT = "/api/leads"
const BRANCH = "Reshape Clinic"

const FEATURES = [
  {
    icon: LuSyringe,
    title: "Targeted Scalp Care",
    desc: "Intradermal and meso based scalp applications using selected ingredients according to the protocol.",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/images-2_fyq5wv.jpg",
  },
  {
    icon: LuDroplet,
    title: "Nutritional Support",
    desc: "Doctor guided IV nutrient support may be considered depending on individual requirements and suitability.",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/images-3_r0rvih.jpg",
  },
  {
    icon: LuZap,
    title: "Scalp Care + LLLT",
    desc: "Clinical scalp care combined with Low Level Laser Therapy (LLLT) as part of a personalised program.",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/images-1_hfm1wi.jpg",
  },
]

export default function Program() {
  const formRef = useRef<HTMLFormElement>(null)
  const [index, setIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const maxIndex = FEATURES.length - 1

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1))
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1))

  useEffect(() => {
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const form = formRef.current
    if (!form) return
    const params = new URLSearchParams(window.location.search)
    ;["utm_source", "utm_medium", "utm_campaign"].forEach((name) => {
      const input = form.elements.namedItem(name) as HTMLInputElement | null
      if (input) input.value = params.get(name) || ""
    })
  }, [])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = formRef.current
    if (!form) return
    if (!form.checkValidity()) return form.reportValidity()

    setSubmitting(true)
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          area: data.concern,
          duration: data.since,
          branch: BRANCH,
          source: data.utm_source || "direct",
          medium: data.utm_medium || "",
          campaign: data.utm_campaign || "",
          pageUrl: window.location.href,
          formSource: "Reshape-General-leads",
        }),
      })
      if (!response.ok) throw new Error(`Request failed with ${response.status}`)
      track("lead_submit", { branch: BRANCH, concern: data.concern })
      window.location.href = "/thank-you"
    } catch {
      setSubmitting(false)
      alert("That did not go through. Please call +91 86085 51555 instead.")
    }
  }

  return (
    <section id="trinity" className="border-b border-[#e7ecf3] bg-white py-14 sm:py-16 lg:py-20 max-[470px]:py-6">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col px-5 sm:px-8 lg:grid lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_auto_auto_auto_auto] lg:items-start lg:gap-x-16">
        {/* 1. label */}
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <p className="kicker">Introducing Hair Trinity</p>
        </Reveal>

        {/* 2. heading */}
        <Reveal index={1} className="mt-4 lg:col-start-1 lg:row-start-2">
          <h2 className="text-[clamp(1.9rem,4vw,3rem)]">Three Approaches. One Personalised Program.</h2>
        </Reveal>

        {/* 4. card section — carousel of the three approaches (mobile: right after the description; desktop: right column spanning all rows) */}
        <Reveal
          index={3}
          className="mt-8 lg:col-start-1 lg:row-start-3"
        >
          <div className="relative">
            <div className="overflow-hidden rounded-[26px] border border-[#e7ecf3] bg-[#fbf8f5]">
              <div
                className="flex items-stretch transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {FEATURES.map((f) => (
                  <div key={f.title} className="w-full shrink-0 grow-0">
                    <FeatureSlide f={f} />
                  </div>
                ))}
              </div>
            </div>

            {/* arrows */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute -left-5 top-[38%] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] shadow-lg transition-all hover:border-[#fccbb6] hover:bg-[#fef5ef]"
            >
              <LuChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute -right-5 top-[38%] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] shadow-lg transition-all hover:border-[#fccbb6] hover:bg-[#fef5ef]"
            >
              <LuChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* dots */}
          <div className="mt-6 flex justify-center gap-2">
            {FEATURES.map((f, i) => (
              <button
                key={f.title}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-[#22395f]" : "w-2 bg-[#22395f]/25 hover:bg-[#22395f]/50"
                }`}
              />
            ))}
          </div>
        </Reveal>

        <Reveal index={4} className="mt-8 lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:mt-0">
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className="rounded-[26px] border border-[#e7ecf3] bg-[#fbf8f5] p-6 sm:p-8"
          >
            <p className="kicker">Start Your Hair Journey</p>
            <h3 className="mt-3 text-[1.5rem] font-bold text-[#22395f]">Book Your Consultation</h3>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-[#5f6f88]">
              Share a few details and our team will contact you to confirm your consultation.
            </p>

            <div className="mt-6">
              <ProgramField label="Full name" htmlFor="program-name">
                <input id="program-name" name="name" required autoComplete="name" placeholder="Your name" className={inputCls} />
              </ProgramField>
              <ProgramField label="Mobile number" htmlFor="program-phone">
                <input id="program-phone" name="phone" type="tel" required inputMode="numeric" pattern="[6-9][0-9]{9}" title="Enter a 10-digit mobile number starting with 6, 7, 8 or 9." autoComplete="tel" placeholder="10-digit number" className={inputCls} />
              </ProgramField>
              <ProgramField label="Email address" htmlFor="program-email">
                <input id="program-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputCls} />
              </ProgramField>
              <ProgramField label="Your hair concern" htmlFor="program-concern">
                <select id="program-concern" name="concern" required defaultValue="" className={inputCls}>
                  <option value="">Select a concern</option>
                  <option>Hair Regrowth</option>
                  <option>Hair Loss / Hair Fall</option>
                  <option>Baldness / Receding Hairline</option>
                  <option>Hair Thinning</option>
                  <option>Scalp Health</option>
                  <option>Not sure — need advice</option>
                </select>
              </ProgramField>
              <ProgramField label="How long has it been?" htmlFor="program-since">
                <select id="program-since" name="since" required defaultValue="" className={inputCls}>
                  <option value="">Select duration</option>
                  <option>Under 3 months</option>
                  <option>3 to 12 months</option>
                  <option>Over a year</option>
                </select>
              </ProgramField>
            </div>

            <input type="hidden" name="utm_source" />
            <input type="hidden" name="utm_medium" />
            <input type="hidden" name="utm_campaign" />
            <button type="submit" disabled={submitting} className="btn btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-70">
              <span className="relative z-10">{submitting ? "Booking…" : "Schedule Your Consultation"}</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

const inputCls =
  "w-full rounded-xl border border-[#e7ecf3] bg-white px-3.5 py-2.5 text-[0.9rem] text-[#1f2f47] transition-all duration-150 focus:border-[#22395f] focus:outline-none focus:ring-2 focus:ring-[#fccbb6]"

function ProgramField({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <label htmlFor={htmlFor} className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#5f6f88]">
        {label}
      </label>
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  A single "approach" slide within the carousel.                            */
/* -------------------------------------------------------------------------- */
function FeatureSlide({ f }: { f: (typeof FEATURES)[number] }) {
  return (
    <article className="flex h-full w-full flex-col rounded-[26px] bg-white">
      {/* image */}
      <div className="aspect-[6/3] w-full flex-none overflow-hidden rounded-[26px]">
        <img src={f.image} alt={f.title} loading="lazy" className="h-full w-full object-cover" />
      </div>

      {/* icon badge — overlapping the image like the original portrait's award seal */}
      <span className="relative z-10 -mt-6 ml-6 flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[#fef5ef] text-[#22395f] shadow-lg ring-4 ring-white">
        <f.icon className="h-6 w-6" />
      </span>

      {/* text panel */}
      <div className="flex flex-1 flex-col justify-center px-6 pb-5 pt-5">
        <h3 className="text-[1.15rem] font-bold text-[#1f2f47]">{f.title}</h3>
        <p className="mt-2 max-w-[42ch] text-[0.92rem] leading-relaxed text-[#5f6f88]">{f.desc}</p>
      </div>
    </article>
  )
}
