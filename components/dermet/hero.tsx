"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import {
  Calendar,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Users,
  Leaf,
  Droplet,
  Search,
  FileText,
  UsersRound,
} from "lucide-react"

/**
 * Reshape hero banner — overlay version.
 *
 * You supplied the actual background plate (navy curve + doctor photo +
 * leaf watermark + peach gradient, no text baked in), so that now IS the
 * background image — no hand-drawn SVG shapes or photo masking needed
 * anymore. Save that file as:
 *
 *   /public/hero-bg.jpg   (or .png — update the src below to match)
 *
 * Everything else — badge, headline, CTA, feature row, the 4 concern
 * cards + connecting dots, bottom step bar, corner text — is still real,
 * live markup positioned on top of it, mapped from the same 1916x821
 * coordinate space as the background plate.
 *
 * You still need these 4 real image files for the concern-card thumbnails:
 *   /public/concern-hairfall.jpg
 *   /public/concern-hairloss.jpg
 *   /public/concern-baldness.jpg
 *   /public/concern-alopecia.jpg
 */

const concerns = [
  { label: "Continue\nHairfall ?", img: "Continue-1.avif", top: 4.45 },
  { label: "Severe\nHairloss ?", img: "/Continue-2.jpg", top: 24.81 },
  { label: "Male Pattern\nBaldness ?", img: "/Continue-3.avif", top: 44.53 },
  { label: "Alopecia ?", img: "/Continue-4.jpg", top: 64.25 },
]

const steps = [
  { icon: Search, label: "Complete\nScalp Evaluation" },
  { icon: FileText, label: "Treatment\nPlan" },
  { icon: UsersRound, label: "Post Treatment\nFollow up" },
]

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("assessment-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const [activeConcern, setActiveConcern] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveConcern((i) => (i + 1) % concerns.length)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="top" className="relative w-full bg-[#FDF8F5]">
      {/* ================= MOBILE / TABLET LAYOUT (< lg) ================= */}
      {/* The desktop version below overlays real text on top of a single wide
          (1916x821) background plate using cqw units — at phone widths that
          same aspect ratio squashes into a ~150px strip and every element
          becomes unreadably tiny. So mobile gets its own stacked, normal-flow
          layout with regular Tailwind text sizes instead of scaling the same
          markup down. */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden rounded-b-[36px] bg-[#0A1B3D] px-5 pb-8 pt-6 sm:px-8">
          {/* logo + badge — one row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 -rotate-45 text-[#FBA062]" strokeWidth={1.75} />
              <div className="leading-none text-white">
                <div className="text-lg font-bold">Reshape</div>
                <div className="mt-0.5 text-[0.68rem] text-white/70">Hair&nbsp;|&nbsp;Skin&nbsp;|&nbsp;You</div>
              </div>
            </div>

            <div
              className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.8rem] font-semibold text-[#0A1B3D]"
              style={{ background: "linear-gradient(90deg,#F3C4A4,#FBA062)" }}
            >
              <Droplet className="h-3.5 w-3.5" fill="#0A1B3D" strokeWidth={0} />
              #1 Hair Specialist
            </div>
          </div>

          {/* headline */}
          <h1
            className="mt-4 text-[2.1rem] font-extrabold leading-[1.05] sm:text-[2.5rem]"
            style={{ color: "#FFFFFF" }}
          >
            CONSULT
            <br />
            <span style={{ color: "#FBA062" }}>Dr. Aneesha</span>
          </h1>

          <p className="mt-3 max-w-[30ch] text-[0.95rem] leading-relaxed text-white/80">
            Aesthetic Physician with 5+ years of experience At Reshape
          </p>

          <button
            onClick={scrollToForm}
            className="mt-5 hidden items-center gap-2 rounded-full px-5 py-3 text-[0.95rem] font-bold text-[#0A1B3D] transition hover:brightness-95"
            style={{ background: "linear-gradient(90deg,#F3C4A4,#FBA062)" }}
          >
            <Calendar className="h-4 w-4" strokeWidth={2.2} />
            Schedule a 1:1 Call
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </button>

          {/* feature row */}
          <div className="mt-6 flex items-center gap-3 text-[0.72rem] text-white/90 sm:text-[0.8rem]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#FBA062]" fill="#FBA062" stroke="#0A1B3D" strokeWidth={1.2} />
              <span>Expert Care</span>
            </div>
            <span className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-1.5 leading-tight">
              <Users className="h-5 w-5 shrink-0 text-[#FBA062]" fill="#FBA062" stroke="#0A1B3D" strokeWidth={1} />
              <span>
                Personalized
                <br />
                Treatment
              </span>
            </div>
            <span className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-1.5 leading-tight">
              <Leaf className="h-5 w-5 shrink-0 text-[#FBA062]" fill="#FBA062" stroke="#0A1B3D" strokeWidth={1} />
              <span>
                Visible
                <br />
                Results
              </span>
            </div>
          </div>

          {/* doctor photo */}
          <div className="relative mt-7 aspect-[4/5] w-full overflow-hidden rounded-t-[64px] rounded-b-2xl">
            <Image
              src="/banner-2.png"
              alt="Dr. Aneesha, Aesthetic Physician at Reshape"
              fill
              className="object-cover"
              style={{ objectPosition: "58% 15%" }}
            />
            <p className="absolute right-4 top-3 -rotate-6 text-right font-serif text-[1.1rem] italic leading-[1.15] text-[#0A1B3D] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] sm:text-[1.3rem]">
              Healthier Hair
              <br />
              Happier You
            </p>
          </div>
        </div>

        {/* concern cards — one row, auto-scrolling right to left */}
        <div className="overflow-hidden bg-[#FDF8F5] py-7 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
          <div className="marquee gap-4 pl-5" style={{ animationDuration: "20s" }}>
            {[...concerns, ...concerns].map((c, i) => (
              <div
                key={`${c.label}-${i}`}
                aria-hidden={i >= concerns.length}
                className="flex w-[250px] shrink-0 items-center gap-3 rounded-2xl bg-white p-2.5 shadow-[0_6px_16px_-10px_rgba(10,27,61,0.25)]"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
                  <Image src={c.img} alt={c.label.replace("\n", " ")} fill className="object-cover" />
                </div>
                <span className="flex-1 whitespace-pre-line text-[0.95rem] font-bold leading-tight text-[#0A1B3D]">
                  {c.label}
                </span>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: "linear-gradient(135deg,#FBB27E,#FB8B3F)" }}
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* step bar — one row, auto-scrolling left to right */}
        <div className="bg-[#FDF8F5] px-5 pb-4 sm:px-8">
          <div className="overflow-hidden rounded-2xl bg-white py-5 shadow-[0_14px_32px_-18px_rgba(10,27,61,0.3)] [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
            <div className="marquee gap-8 pl-5" style={{ animationDuration: "16s", animationDirection: "reverse" }}>
              {[...steps, ...steps].map((step, i) => (
                <div key={`${step.label}-${i}`} aria-hidden={i >= steps.length} className="flex shrink-0 items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "linear-gradient(135deg,#FBB27E,#FB8B3F)" }}
                  >
                    <step.icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </span>
                  <span className="whitespace-pre-line text-[0.9rem] font-bold leading-tight text-[#0A1B3D]">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* corner text */}
        <p className="bg-[#FDF8F5] px-5 text-center text-[0.72rem] font-bold uppercase leading-relaxed tracking-[0.15em] text-[#0A1B3D] sm:px-8">
          Stronger Hair · Brighter Tomorrow
        </p>

        {/* CTA — last item in the mobile layout */}
        <div className="bg-[#FDF8F5] px-5 pb-8 pt-5 sm:px-8">
          <button
            onClick={scrollToForm}
            className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[1rem] font-bold text-[#0A1B3D] transition hover:brightness-95"
            style={{ background: "linear-gradient(90deg,#F3C4A4,#FBA062)" }}
          >
            <Calendar className="h-5 w-5" strokeWidth={2.2} />
            Schedule a 1:1 Call
            <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* ================= DESKTOP LAYOUT (lg and up) ================= */}
      <div
        className="relative z-0 mx-auto hidden w-full max-w-[1916px] overflow-hidden isolate lg:block"
        style={{ containerType: "inline-size", aspectRatio: "1916 / 821" }}
      >
        {/* ================= BACKGROUND PLATE (your uploaded image) ================= */}
        <Image
          src="/banner-2.png"
          alt=""
          fill
          priority
          aria-hidden
          className="z-0 object-cover"
        />

        {/* ================= TIMELINE DOTS for the 4 concern cards ================= */}
        {/* Not part of the background plate, so still drawn as a small SVG overlay. */}
        <svg
          className="absolute inset-0 z-[1] h-full w-full"
          viewBox="0 0 1916 821"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F3C4A4" />
              <stop offset="100%" stopColor="#FBA062" />
            </linearGradient>
          </defs>
          <line x1="1398" y1="120" x2="1398" y2="632" stroke="url(#orangeGrad)" strokeWidth="3" />
          {[120, 314, 486, 632].map((y) => (
            <circle key={y} cx="1398" cy={y} r="7" fill="#FBA062" />
          ))}
        </svg>

        {/* ================= LOGO ================= */}
        <div className="absolute z-10" style={{ left: "5.55%", top: "4.69%", width: "2.2%", aspectRatio: "1" }}>
          <Leaf className="h-full w-full -rotate-45 text-[#FBA062]" strokeWidth={1.75} />
        </div>
        <div className="absolute z-10 text-white" style={{ left: "8.35%", top: "3.9%", width: "12%" }}>
          <div className="font-bold leading-none" style={{ fontSize: "1.9cqw" }}>Reshape</div>
          <div className="mt-[0.4cqw] text-white/75 leading-none" style={{ fontSize: "0.85cqw" }}>
            Hair&nbsp;|&nbsp;Skin&nbsp;|&nbsp;You
          </div>
        </div>

        {/* ================= BADGE ================= */}
        <div
          className="absolute z-10 flex items-center gap-[0.6cqw] rounded-full font-semibold text-[#0A1B3D]"
          style={{
            left: "4.96%",
            top: "15.5%",
            height: "6.9%",
            padding: "0 1.4cqw",
            fontSize: "1.05cqw",
            background: "linear-gradient(90deg,#F3C4A4,#FBA062)",
          }}
        >
          <Droplet className="h-[1.3cqw] w-[1.3cqw]" fill="#0A1B3D" strokeWidth={0} />
          #1 Hair Specialist
        </div>

        {/* ================= HEADLINE ================= */}
        {/* Plain <div>s with inline color (not <h1>/Tailwind text color) so no
            global heading CSS from the host site (gradient/clip-text resets
            are common in Next.js starters) can override these colors. */}
        <div
          className="absolute z-10 font-extrabold leading-[1.05]"
          style={{ left: "5.06%", top: "24.4%", width: "30%", fontSize: "3.35cqw", color: "#FFFFFF" }}
        >
          CONSULT
        </div>
        <div
          className="absolute z-10 font-extrabold leading-[1.05]"
          style={{ left: "5.06%", top: "33.7%", width: "30%", fontSize: "3.7cqw", color: "#FBA062" }}
        >
          Dr. Aneesha
        </div>

        <p
          className="absolute z-10 leading-[1.4]"
          style={{ left: "5.06%", top: "46.2%", width: "22%", fontSize: "1.28cqw", color: "#FFFFFF" }}
        >
          Aesthetic Physician with 5+ years
          <br />
          of experience
          At Reshape
        </p>

        <button
          onClick={scrollToForm}
          className="absolute z-10 flex w-fit items-center gap-[1cqw] rounded-full font-bold transition hover:brightness-95"
          style={{
            left: "4.96%",
            top: "58.5%",
            padding: "0.9cqw 2.2cqw",
            fontSize: "1.35cqw",
            color: "#0A1B3D",
            background: "linear-gradient(90deg,#F3C4A4,#FBA062)",
          }}
        >
          <Calendar className="h-[1.4cqw] w-[1.5cqw]" strokeWidth={2.2} />
          Schedule a 1:1 Call
          <ArrowRight className="h-[1.5cqw] w-[1.5cqw]" strokeWidth={2.2} />
        </button>

        {/* ================= FEATURE ROW ================= */}
        <div
          className="absolute z-10 flex items-center"
          style={{ left: "4.96%", top: "71.5%", fontSize: "0.85cqw", color: "#FFFFFF" }}
        >
          <div className="flex items-center gap-[0.6cqw]">
            <ShieldCheck className="h-[1.8cqw] w-[1.8cqw] text-[#FBA062]" fill="#FBA062" stroke="#0A1B3D" strokeWidth={1.2} />
            <span>Expert Care</span>
          </div>
          <span className="mx-[1.4cqw] h-[2.2cqw] w-px bg-white/30" />
          <div className="flex items-center gap-[0.6cqw] leading-tight">
            <Users className="h-[1.8cqw] w-[1.8cqw] shrink-0 text-[#FBA062]" fill="#FBA062" stroke="#0A1B3D" strokeWidth={1} />
            <span>
              Personalized
              <br />
              Treatment
            </span>
          </div>
          <span className="mx-[1.4cqw] h-[2.2cqw] w-px bg-white/30" />
          <div className="flex items-center gap-[0.6cqw] leading-tight">
            <Leaf className="h-[1.8cqw] w-[1.8cqw] shrink-0 text-[#FBA062]" fill="#FBA062" stroke="#0A1B3D" strokeWidth={1} />
            <span>
              Visible
              <br />
              Results
            </span>
          </div>
        </div>

        {/* ================= HANDWRITTEN TAGLINE ================= */}
        <p
          className="absolute z-10 -rotate-10 font-serif italic leading-[1.15] text-[#0A1B3D]"
          style={{ left: "57.7%", top: "3.8%", width: "16%", fontSize: "1.4cqw" }}
        >
          Healthier Hair
          <br />
          Happier You
        </p>

        {/* ================= 4 CONCERN CARDS ================= */}
        {concerns.map((c, i) => {
          const active = i === activeConcern
          return (
            <div
              key={c.label}
              className="absolute z-10 flex items-center gap-[0.9cqw] rounded-2xl bg-white transition-all duration-700 ease-out"
              style={{
                left: "75.05%",
                width: "21.24%",
                top: `${c.top}%`,
                height: "16.5%",
                padding: "1cqw",
                transform: active ? "scale(1.045)" : "scale(1)",
                boxShadow: active
                  ? "0 1.4cqw 2.6cqw -0.9cqw rgba(251,139,63,0.55), 0 0 0 0.14cqw #FBA062"
                  : "0 0.5cqw 1.4cqw -0.8cqw rgba(10,27,61,0.25)",
                zIndex: active ? 20 : 10,
              }}
            >
              <div className="relative aspect-square h-full shrink-0 overflow-hidden rounded-xl bg-neutral-200">
                <Image src={c.img} alt={c.label.replace("\n", " ")} fill className="object-cover" />
              </div>
              <span
                className="flex-1 whitespace-pre-line font-bold leading-tight text-[#0A1B3D]"
                style={{ fontSize: "1.2cqw" }}
              >
                {c.label}
              </span>
              <span
                className="flex aspect-square shrink-0 items-center justify-center rounded-full text-white transition-transform duration-700 ease-out"
                style={{
                  width: "14%",
                  background: "linear-gradient(135deg,#FBB27E,#FB8B3F)",
                  transform: active ? "scale(1.12)" : "scale(1)",
                }}
              >
                <ChevronRight style={{ width: "55%", height: "55%" }} strokeWidth={2.5} />
              </span>
            </div>
          )
        })}

        {/* ================= BOTTOM STEP BAR ================= */}
        <div
          className="absolute z-10 flex items-center justify-between rounded-[1.5cqw] bg-white shadow-xl"
          style={{ left: "18%", top: "82.10%", width: "65.24%", height: "12.7%", padding: "0 2.5cqw" }}
        >
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center" style={{ gap: "1.4cqw" }}>
              <div className="flex items-center" style={{ gap: "1cqw" }}>
                <span
                  className="flex shrink-0 items-center justify-center rounded-full"
                  style={{ width: "3.4cqw", height: "3.4cqw", background: "linear-gradient(135deg,#FBB27E,#FB8B3F)" }}
                >
                  <step.icon className="text-white" style={{ width: "45%", height: "45%" }} strokeWidth={2} />
                </span>
                <span
                  className="whitespace-pre-line font-bold leading-tight text-[#0A1B3D]"
                  style={{ fontSize: "1.15cqw" }}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="text-[#0A1B3D]/30" style={{ width: "1.6cqw", height: "1.6cqw" }} />
              )}
            </div>
          ))}
        </div>

        {/* ================= BOTTOM-RIGHT CORNER TEXT ================= */}
        <p
          className="absolute z-10 text-right font-bold uppercase text-[#0A1B3D]"
          style={{
            left: "84.5%",
            top: "83.3%",
            width: "14%",
            fontSize: "0.85cqw",
            letterSpacing: "0.15em",
            lineHeight: 1.5,
          }}
        >
          Stronger Hair
          <br />
          Brighter Tomorrow
        </p>
      </div>
    </section>
  )
}