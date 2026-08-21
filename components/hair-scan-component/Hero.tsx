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

// 3D icon chip: raised, gloss 
const ICON_3D =
  "flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-[8px] sm:rounded-[9px] border border-white bg-gradient-to-br from-white to-[#fbeade] text-[#22395f] " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_8px_-2px_rgba(34,57,95,0.28)]"

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="top"
      onClick={scrollToForm}
      className="relative cursor-pointer overflow-hidden bg-[#fbf8f5]"
    >
      <div className="relative mx-auto w-full max-w-[1912px]">
        <Image
          src="/banner.jpeg"
          alt="The Hair Trinity Program — three advanced hair therapies in one doctor-personalised session"
          width={1912}
          height={823}
          priority
          className="hidden h-auto w-full sm:block"
        />
        <Image
          src="/banner.jpeg"
          alt="The Hair Trinity Program — three advanced hair therapies in one doctor-personalised session"
          width={864}
          height={1821}
          priority
          className="h-auto w-full sm:hidden"
        />

        <div className="absolute right-0 top-0 hidden aspect-square h-full sm:block">
          {/* floating cards */}
          <div className="rise d3 absolute right-[2%] top-[1%] hidden w-[38%] max-w-[118px] sm:block sm:max-w-[152px] lg:-left-[20%] lg:top-[2%] lg:w-[46%]">
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

          <div className="rise d4 absolute right-[0%] top-[40%] hidden w-[40%] max-w-[126px] sm:block sm:max-w-[184px] lg:left-[2%] lg:top-[38%] lg:w-[48%]">
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

          <div className="rise d4 absolute bottom-[2%] left-[2%] hidden w-[38%] max-w-[118px] sm:block sm:max-w-[152px] lg:left-[30%] lg:w-[46%]">
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
      </div>
    </section>
  )
}
