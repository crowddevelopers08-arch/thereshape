"use client"

import Image from "next/image"
import { Check, Star } from "lucide-react"

/**
 * Skin & Hair Clinic banner — responsive replica.
 *
 * TWO LAYOUTS, one component:
 *
 * 1. sm and up (>=640px) — the exact pixel-mapped replica of the reference.
 *    Reference art is 766 x 292px; every element is positioned from that
 *    coordinate space (left% = x/766, top% = y/292). Type is sized in `cqw`
 *    (1cqw = 1% of the banner's own width) and wrapped in clamp() so it
 *    stays readable on a small tablet and stops growing on an ultrawide
 *    monitor, instead of scaling away to nothing in either direction.
 *
 * 2. below sm — the absolute composition would put the headline at ~11px,
 *    so it's replaced by a stacked flow layout: text first, model below.
 *    Same content, same colors, readable at 360px.
 *
 * Palette matches the rest of thereshape's site (navy + orange), not the
 * original brown/taupe reference.
 *
 * Traced measurements from the source file (used by the sm+ layout):
 *   left text margin ...... x = 40px
 *   eyebrow cap top ....... y = 36
 *   headline cap tops ..... y = 66 / 97   (31px line spacing)
 *   checklist cap tops .... y = 137 / 159 / 181 / 203  (22px spacing)
 *   button box ............ 40,233 -> 173,261  (133 x 28, fully rounded)
 *   cream circle .......... center (645, 138), radius 119
 *   outer ring ............ same center, radius ~134, lighter accent
 *   dot grid A ............ x 744, y 72   (6x6, 8px pitch)
 *   dot grid B ............ x 526, y 172  (6x6, 8px pitch)
 *
 * IMAGE YOU SUPPLY (put in /public):
 *   /skintre.jpg — clipped to a circle in place, so any reasonably
 *                  face-centered photo works; no cutout/transparency needed.
 */

const bullets = [
  "4.9 / 5 Rated Treatment",
  "Experienced Dermet",
  "Advanced Equipment",
  "Personalized Treatment Plan",
]

const EYEBROW = "1# Skin Care in Chennai , Mylapore"
const HEADLINE = "Get a Clear & Glowing Skin"
const CTA = "Share Your Skin Problem"

/* Shared background wash — brand navy instead of the original brown. */
function Backdrop() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-[1]"
      style={{
        backgroundImage:
          "linear-gradient(100deg, rgba(18,39,74,0.97) 0%, rgba(10,27,61,0.95) 45%, rgba(19,43,82,0.94) 100%)",
      }}
    />
  )
}

/* Floating "4.9/5 · 10K+ patients" stat card, same style as the Doctor
   section's floating badges elsewhere on the site. */
function RatingBadge({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`float z-20 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_18px_36px_-16px_rgba(10,27,61,0.5)] ${className}`}
      style={style}
    >
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#fef5ef]">
        <Star className="h-4 w-4 text-[#FBA062]" fill="#FBA062" />
      </span>
      <div className="leading-tight">
        <div className="text-[13px] font-bold text-[#0A1B3D] sm:text-[clamp(10px,1.7cqw,16px)]">4.9/5 Rating</div>
        <div className="text-[11px] font-medium text-[#5f6f88] sm:text-[clamp(8px,1.25cqw,12px)]">
          10K+ Happy Patients
        </div>
      </div>
    </div>
  )
}

export default function ClinicBanner() {
  return (
    <section className="w-full bg-[#0A1B3D]">
      {/* ================================================================
          MOBILE (< 640px) — stacked flow layout
      ================================================================= */}
      <div className="relative isolate overflow-hidden px-5 pb-0 pt-8 sm:hidden">
        <Backdrop />

        <div className="relative z-10">
          <p className="text-[13px] font-medium leading-snug text-white/70">{EYEBROW}</p>

          <div className="mt-3 text-[26px] font-bold leading-[1.25] tracking-[-0.01em] text-white">{HEADLINE}</div>

          <ul className="mt-5 space-y-3">
            {bullets.map((text) => (
              <li key={text} className="flex items-center gap-2.5 text-[14px] text-white">
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#FBA062]">
                  <Check strokeWidth={3.5} className="h-[11px] w-[11px] text-[#0A1B3D]" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-6 w-full rounded-full px-6 py-3 text-[14px] font-semibold text-[#0A1B3D] transition hover:brightness-95"
            style={{ background: "linear-gradient(90deg,#F3C4A4,#FBA062)" }}
          >
            {CTA}
          </button>
        </div>

        {/* model + circle, centered beneath the copy */}
        <div className="relative z-10 mt-8 flex h-[260px] items-end justify-center">
          <div aria-hidden className="absolute bottom-[26px] aspect-square w-[250px] rounded-full bg-[#FBA062]/25" />
          <div className="relative z-[1] aspect-square w-[222px] overflow-hidden rounded-full bg-white">
            <Image src="/skintre.jpg" alt="Smiling woman receiving a skin treatment" fill priority className="object-cover" />
          </div>
          <RatingBadge className="absolute bottom-2 left-1" />
        </div>
      </div>

      {/* ================================================================
          TABLET / DESKTOP (>= 640px) — exact pixel-mapped replica
      ================================================================= */}
      <div
        className="relative isolate hidden aspect-[766/292] w-full overflow-hidden sm:block"
        style={{ containerType: "inline-size" }}
      >
        <Backdrop />

        {/* outer ring (r ~134 @ 645,138) */}
        <div
          aria-hidden
          className="absolute z-[2] aspect-square rounded-full bg-[#FBA062]/30"
          style={{ left: "66.71%", top: "1.37%", width: "34.99%" }}
        />

        {/* circle backdrop (r 119 @ 645,138) */}
        <div
          aria-hidden
          className="absolute z-[3] aspect-square rounded-full bg-white"
          style={{ left: "68.67%", top: "6.51%", width: "31.07%" }}
        />

        {/* dot grid A — upper right, inside circle */}
        <div
          aria-hidden
          className="absolute z-[4]"
          style={{
            left: "97.13%",
            top: "24.66%",
            width: "5.22%",
            height: "13.7%",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 0.8px, transparent 0.9px)",
            backgroundSize: "calc(100cqw/95.75) calc(100cqw/95.75)",
          }}
        />

        {/* dot grid B — lower left of circle */}
        <div
          aria-hidden
          className="absolute z-[4]"
          style={{
            left: "68.67%",
            top: "58.9%",
            width: "5.22%",
            height: "14.73%",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 0.8px, transparent 0.9px)",
            backgroundSize: "calc(100cqw/95.75) calc(100cqw/95.75)",
          }}
        />

        {/* model photo — clipped to sit neatly inside the circle
            (same left/top/width as the circle behind it) */}
        <div
          className="absolute z-[5] aspect-square overflow-hidden rounded-full"
          style={{ left: "68.67%", top: "6.51%", width: "31.07%" }}
        >
          <Image src="/skintre.jpg" alt="Smiling woman receiving a skin treatment" fill priority className="object-cover" />
        </div>

        {/* floating rating badge, tucked under the circle's bottom-left edge */}
        <RatingBadge className="absolute" style={{ left: "56%", top: "66%" }} />

        {/* eyebrow */}
        <p
          className="absolute z-10 font-medium tracking-[0.01em] text-white/70"
          style={{
            left: "5.22%",
            top: "11.3%",
            fontSize: "clamp(9px, 1.57cqw, 19px)",
            lineHeight: 1.2,
          }}
        >
          {EYEBROW}
        </p>

        {/* headline — plain <div> + inline color so global h1/h2 styles can't override it */}
        <div
          className="absolute z-10 font-bold"
          style={{
            left: "5.22%",
            top: "20.55%",
            width: "62%",
            fontSize: "clamp(16px, 2.87cqw, 34px)",
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            color: "#FFFFFF",
          }}
        >
          {HEADLINE}
        </div>

        {/* checklist */}
        {bullets.map((text, i) => (
          <div
            key={text}
            className="absolute z-10 flex items-center text-white"
            style={{
              left: "5.22%",
              top: `${45.55 + i * 7.53}%`,
              fontSize: "clamp(10px, 1.83cqw, 22px)",
              lineHeight: 1.2,
              gap: "0.92cqw",
            }}
          >
            <span
              className="flex shrink-0 items-center justify-center rounded-full bg-[#FBA062]"
              style={{
                width: "clamp(11px, 1.83cqw, 22px)",
                height: "clamp(11px, 1.83cqw, 22px)",
              }}
            >
              <Check strokeWidth={3.5} className="text-[#0A1B3D]" style={{ width: "62%", height: "62%" }} />
            </span>
            {text}
          </div>
        ))}

        {/* CTA (40,233 -> 173,261) */}
        <button
          type="button"
          className="absolute z-10 flex items-center justify-center whitespace-nowrap rounded-full font-semibold text-[#0A1B3D] transition hover:brightness-95"
          style={{
            left: "5.22%",
            top: "79.79%",
            width: "17.36%",
            height: "9.93%",
            fontSize: "clamp(9px, 1.57cqw, 19px)",
            background: "linear-gradient(90deg,#F3C4A4,#FBA062)",
          }}
        >
          {CTA}
        </button>
      </div>
    </section>
  )
}
