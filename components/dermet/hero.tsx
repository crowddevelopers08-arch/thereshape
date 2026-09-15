"use client"

import Image from "next/image"
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

  return (
    <section id="top" className="relative w-full bg-[#FDF8F5]">
      <div
        className="relative z-0 mx-auto w-full max-w-[1916px] overflow-hidden isolate"
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
        {concerns.map((c) => (
          <div
            key={c.label}
            className="absolute z-10 flex items-center gap-[0.9cqw] rounded-2xl bg-white shadow-md"
            style={{ left: "75.05%", width: "21.24%", top: `${c.top}%`, height: "16.5%", padding: "1cqw" }}
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
              className="flex aspect-square shrink-0 items-center justify-center rounded-full text-white"
              style={{ width: "14%", background: "linear-gradient(135deg,#FBB27E,#FB8B3F)" }}
            >
              <ChevronRight style={{ width: "55%", height: "55%" }} strokeWidth={2.5} />
            </span>
          </div>
        ))}

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