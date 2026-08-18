"use client"

import Image from "next/image"
import { Activity, BadgeCheck, Star } from "lucide-react"
import CountUp from "./CountUp"

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
          src="banner.jpeg"
          alt="The Hair Trinity Program — three advanced hair therapies in one doctor-personalised session"
          width={1912}
          height={783}
          priority
          className="hidden h-auto w-full sm:block"
        />
        <Image
          src="banner-image.png"
          alt="The Hair Trinity Program — three advanced hair therapies in one doctor-personalised session"
          width={864}
          height={1821}
          priority
          className="h-auto w-full sm:hidden"
        />

      </div>
    </section>
  )
}
