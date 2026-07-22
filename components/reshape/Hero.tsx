"use client"

import { track } from "./track"
import { Activity, BadgeCheck, Star, ShieldCheck, Lock, Users, CalendarCheck } from "lucide-react"
import CountUp from "./CountUp"
import { FcGoogle } from "react-icons/fc"

const SANS = "var(--font-inter), ui-sans-serif, system-ui, sans-serif"
const SERIF = "var(--font-merriweather), Georgia, serif"

// 3D floating-card face: gradient surface + top highlight + layered depth shadow,
// with a slight perspective tilt that straightens on hover.
const CARD_3D =
  "z-20 rounded-[14px] sm:rounded-[16px] border border-white/80 bg-gradient-to-br from-white via-[#fdf7f3] to-[#f6e7de] p-2.5 sm:p-3.5 " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_4px_rgba(34,57,95,0.08),0_16px_28px_-10px_rgba(34,57,95,0.35),0_40px_60px_-26px_rgba(34,57,95,0.5)] " +
  "backdrop-blur transform-gpu transition-transform duration-300 will-change-transform " +
  "[transform:perspective(900px)_rotateX(7deg)_rotateY(-11deg)] hover:[transform:perspective(900px)_rotateX(0deg)_rotateY(0deg)_translateY(-4px)]"

// 3D icon chip: raised, glossy top edge.
const ICON_3D =
  "flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-[8px] sm:rounded-[9px] border border-white bg-gradient-to-br from-white to-[#fbeade] text-[#22395f] " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_8px_-2px_rgba(34,57,95,0.28)]"


const AVATARS = [
  { initials: "AK", bg: "#3a537f" },
  { initials: "MP", bg: "#c07a54" },
  { initials: "RV", bg: "#5f6f88" },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#fbf8f5]">
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-8 lg:gap-y-0 lg:py-14 max-[470px]:py-6">
        {/* ── intro: badge + headline + paragraph ── */}
        <div className="max-w-[560px] lg:col-start-1 lg:row-start-1 lg:self-end">
          <div className="rise d1 inline-flex items-center gap-2 rounded-full border border-[#fccbb6] bg-[#fef5ef] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#22395f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22395f]" />
            Clinically proven · Made simple
          </div>

          <h1
            className="rise d2 mt-6 text-[clamp(2.4rem,1.2rem+4.4vw,4.3rem)] font-extrabold leading-[1.02] text-[#22395f]"
            style={{ fontFamily: SANS, letterSpacing: "-0.03em" }}
          >
            Advanced hair
            <br />
            restoration,
            <br />
            <span className="hl font-normal" style={{ fontFamily: SERIF }}>
              made for you.
            </span>
          </h1>

          <p className="rise d3 mt-6 max-w-[42ch] text-[1.05rem] leading-relaxed text-[#5f6f88]" style={{ fontFamily: SANS }}>
            Personalized treatment with medical science, expert support, and proven results.
          </p>
        </div>

        {/* ── subject + floating cards (mobile: sits between paragraph and CTAs) ── */}
        <div className="relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[460px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-[560px] lg:self-center">
          {/* circular image backdrop */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-[#e7ecf3] shadow-[inset_0_0_60px_-20px_rgba(34,57,95,0.35)]"
          >
            <img src="https://res.cloudinary.com/n0ccg2u6/image/upload/svg_qlkmhu.png" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[#fccbb6]/35" />
          </div>

          {/* floating cards */}
          <div className="rise d3 absolute right-[2%] top-[1%] hidden w-[38%] max-w-[118px] sm:block sm:max-w-[152px] lg:right-[10%] lg:top-[0%] lg:w-[46%]">
            <div className="float" style={{ animationDelay: "0s" }}>
              <div className={CARD_3D}>
                <span className={ICON_3D}>
                  <Activity className="h-4 w-4" />
                </span>
                <p className="mt-2 text-[1.05rem] sm:mt-2.5 sm:text-[1.35rem] font-extrabold leading-none text-[#22395f]" style={{ fontFamily: SANS }}>
                  <CountUp end={92} suffix="%" />
                </p>
                <p className="mt-1 text-[0.6rem] sm:mt-1.5 sm:text-[0.72rem] leading-tight text-[#5f6f88]" style={{ fontFamily: SANS }}>
                  Patients saw visible regrowth*
                </p>
              </div>
            </div>
          </div>

          <div className="rise d4 absolute right-[0%] top-[40%] hidden w-[40%] max-w-[126px] sm:block sm:max-w-[164px] lg:right-[-14%] lg:top-[32%] lg:w-[48%]">
            <div className="float" style={{ animationDelay: "-1.6s" }}>
              <div className={CARD_3D}>
                <span className={ICON_3D}>
                  <BadgeCheck className="h-4 w-4" />
                </span>
                <p className="mt-2 text-[0.8rem] sm:mt-2.5 sm:text-[0.95rem] font-bold leading-tight text-[#22395f]" style={{ fontFamily: SANS }}>
                  Certified Specialists
                </p>
                <p className="mt-1 text-[0.6rem] sm:mt-1.5 sm:text-[0.72rem] leading-tight text-[#5f6f88]" style={{ fontFamily: SANS }}>
                  Board-certified &amp; trusted by 500+ patients
                </p>
              </div>
            </div>
          </div>

          <div className="rise d4 absolute bottom-[2%] left-[2%] hidden w-[38%] max-w-[118px] sm:block sm:max-w-[152px] lg:left-[62%] lg:w-[46%]">
            <div className="float" style={{ animationDelay: "-3.2s" }}>
              <div className={CARD_3D}>
                <span className={ICON_3D}>
                  <Star className="h-4 w-4 fill-current" />
                </span>
                <p className="mt-2 text-[1.05rem] sm:mt-2.5 sm:text-[1.35rem] font-extrabold leading-none text-[#22395f]" style={{ fontFamily: SANS }}>
                  <CountUp end={4.8} decimals={1} suffix="/5" />
                </p>
                <p className="mt-1 text-[0.6rem] sm:mt-1.5 sm:text-[0.72rem] leading-tight text-[#5f6f88]" style={{ fontFamily: SANS }}>
                  Patient satisfaction rating
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── actions: CTAs + social proof ── */}
        <div className="max-w-[560px] lg:col-start-1 lg:row-start-2 lg:mt-8 lg:self-start">
          <div className="rise d3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#book"
              onClick={() => track("book_click", { branch: "Reshape Clinic" })}
              style={{ fontFamily: SANS }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#22395f] px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#16263f]"
            >
              Book Your Consultation
            </a>
            <a
              href="tel:+918608551555"
              onClick={() => track("call_click", { branch: "Reshape Clinic" })}
              style={{ fontFamily: SANS }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e7ecf3] bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-[#22395f] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#22395f]"
            >
              Call +91 86085 51555
            </a>
          </div>

          {/* social proof */}
          <div className="rise d4 mt-9 flex items-center gap-4">
            <div className="flex -space-x-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#fbf8f5] bg-white shadow-sm">
                <FcGoogle className="h-5 w-5" />
              </span>
              {AVATARS.map(({ initials, bg }) => (
                <span
                  key={initials}
                  aria-hidden
                  style={{ backgroundColor: bg, fontFamily: SANS }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#fbf8f5] text-[0.72rem] font-bold text-white"
                >
                  {initials}
                </span>
              ))}
            </div>
            <div style={{ fontFamily: SANS }}>
              <p className="text-[0.95rem] font-bold text-[#22395f]">
                <CountUp end={500} suffix="+" /> patients
              </p>
              <p className="flex items-center gap-1.5 text-[0.82rem] text-[#5f6f88]">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#f0a94a] text-[#f0a94a]" />
                  ))}
                </span>
                <CountUp end={4.8} decimals={1} suffix="/5" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
