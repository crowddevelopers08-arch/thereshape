"use client"

import Image from "next/image"
import { Activity, BadgeCheck, Star } from "lucide-react"

const SANS = "var(--font-inter), ui-sans-serif, system-ui, sans-serif"

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

const USPS = [
  { label: "4.9 / 5 Rated Treatment", icon: Star },
  { label: "Experienced Dermet", icon: BadgeCheck },
  { label: "Advanced Equipment", icon: Activity },
  { label: "Personalized Treatment Plan", icon: BadgeCheck },
]

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("assessment-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="top"
      onClick={scrollToForm}
      className="relative cursor-pointer overflow-hidden bg-[#fbf8f5]"
    >
      <div className="relative mx-auto w-full max-w-[1912px]">
        <Image
          src="skin-banner.png"
          alt="The Hair Trinity Program — three advanced hair therapies in one doctor-personalised session"
          width={1912}
          height={483}
          priority
          className="hidden h-auto w-full sm:block"
        />
        <Image
          src="/skin-mbl.png"
          alt="The Hair Trinity Program — three advanced hair therapies in one doctor-personalised session"
          width={864}
          height={1821}
          priority
          className="h-auto w-full sm:hidden"
        />

        <div
          className="absolute left-4 top-[4%] z-10 w-[92%] text-white sm:left-[7.2%] sm:top-[14%] sm:w-[45%]"
          style={{ fontFamily: SANS }}
        >
          <p className="text-[11px] font-semibold leading-tight text-white/85 sm:text-[clamp(10px,1.05vw,20px)]">
            1# Skin Care in Chennai , Mylapore
          </p>
          <div className="mt-2 text-[36px] font-extrabold leading-[1.06] tracking-[-0.05em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.28)] sm:mt-[1.1vw] sm:text-[clamp(22px,2.75vw,53px)]">
            Get a Clear &amp; Glowing Skin
          </div>
          <div className="mt-5 grid max-w-[500px] grid-cols-2 gap-2 sm:mt-[1.6vw] sm:max-w-[22vw] sm:grid-cols-1 sm:gap-[.7vw]">
            {USPS.map(({ label, icon: Icon }) => (
              <div key={label} className={`${CARD_3D} flex items-center gap-1.5 !p-1.5 sm:!p-[.9vw] sm:gap-[.45vw]`}>
                <span className={`${ICON_3D} shrink-0 sm:!h-6 sm:!w-6`}>
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.3} />
                </span>
                <span className="text-[10px] font-semibold leading-[1.2] text-[#22395f] sm:text-[clamp(8px,.88vw,17px)]">{label}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 rounded-full bg-[#f78954] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[.08em] text-white shadow-[0_6px_14px_rgba(0,0,0,.2)] transition hover:bg-[#ef6f35] sm:mt-[3.25vw] sm:px-[1.7vw] sm:py-[.9vw] sm:text-[clamp(9px,.85vw,16px)]"
          >
            <span className="min-[350px]:hidden">Consult Now</span>
            <span className="hidden min-[350px]:inline">Book Your Consultation</span>
          </button>
        </div>

      </div>
    </section>
  )
}
