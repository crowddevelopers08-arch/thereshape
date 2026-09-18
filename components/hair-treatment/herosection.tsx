"use client"

import Image from "next/image"
import { ArrowRight, ClipboardList, Microscope, Phone, Star, Stethoscope } from "lucide-react"

const trustItems = [
  { label: <>4.9 / 5<br />Rated Treatment</>, icon: Star },
  { label: <>Experienced<br />Dermet</>, icon: Stethoscope },
  { label: <>Advanced<br />Equipment</>, icon: Microscope },
  { label: <>Personalized<br />Treatment Plan</>, icon: ClipboardList },
]

function TrustItem({ label, icon: Icon, last }: { label: React.ReactNode; icon: typeof Star; last?: boolean }) {
  return (
    <div className={`flex min-w-0 flex-1 flex-col items-center px-2 text-center ${!last ? "border-r border-[#ff8b5b]/75" : ""}`}>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#ff9a65,#ff7046)] text-white shadow-[0_8px_14px_rgba(255,112,70,.18)] sm:h-14 sm:w-14 lg:h-[4.45vw] lg:w-[4.45vw] lg:max-h-[86px] lg:max-w-[86px]">
        <Icon className="h-5 w-5 stroke-[2.2] sm:h-7 sm:w-7 lg:h-[2.3vw] lg:w-[2.3vw]" />
      </span>
      <span className="mt-2 text-[10px] font-bold leading-[1.35] text-[#062e5a] sm:text-sm lg:mt-[.7vw] lg:text-[1.03vw]">{label}</span>
    </div>
  )
}

export default function HairTreatmentHeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#002e5c] font-[var(--font-merriweather)]">
      <Image
        src="/banner-hair.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />

      <div className="relative mx-auto min-h-[760px] max-w-[1920px] px-5 py-12 sm:min-h-0 sm:aspect-[2.285/1] sm:px-[7vw] sm:py-0">
        {/* Copy and treatment advantages */}
        <div className="relative z-10 max-w-[600px] pt-5 sm:absolute sm:left-[13.3%] sm:top-[18.5%] sm:w-[36%] sm:max-w-none sm:pt-0">
          <h1 className="!m-0 text-[38px] font-black leading-[1.13] tracking-[-.055em] text-[#002c5b] sm:text-[clamp(28px,3.55vw,68px)]">
            Hair Care in<br />Chennai , Mylapore
          </h1>
          <div className="mt-4 h-1 w-32 rounded-full bg-[#ff784b] sm:mt-[1.4vw] sm:h-[.32vw] sm:w-[7.1vw]" />
          <p className="mt-5 text-[39px] font-black leading-[1.08] tracking-[-.055em] text-[#002c5b] sm:mt-[1.4vw] sm:text-[clamp(29px,3.55vw,68px)]">
            Get Your Hair Back<br />
            <span className="text-[#ff7045]">in 90 Days</span>
          </p>

          <div className="mt-8 grid grid-cols-4 sm:absolute sm:left-0 sm:top-[calc(100%+1.55vw)] sm:mt-0 sm:w-[160%] lg:w-[172%]">
            {trustItems.map((item, index) => <TrustItem key={index} {...item} last={index === trustItems.length - 1} />)}
          </div>
        </div>

        <div className="absolute left-[51.7%] top-[42%] z-10 grid aspect-square w-[7.1%] place-items-center rounded-full border-[3px] border-white bg-[linear-gradient(135deg,#ffad79,#f7c18e)] text-[#002c5b] sm:border-[.2vw]">
          <span className="text-center text-[16px] font-black leading-none sm:text-[clamp(13px,2.35vw,44px)]">90<small className="ml-0.5 text-[.37em]">›</small><small className="mt-1 block text-[.31em]">Days</small></span>
        </div>

        {/* Contact block */}
        <div className="relative z-20 mt-11 ml-auto w-fit text-center text-white sm:absolute sm:bottom-[13.5%] sm:right-[11.1%] sm:mt-0 sm:text-left">
          <a href="#book" className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(90deg,#ffc69f,#ffc096)] px-5 py-3 text-[15px] font-black text-[#003061] transition hover:scale-[1.02] sm:gap-[1vw] sm:px-[1.3vw] sm:py-[.85vw] sm:text-[clamp(11px,1.15vw,22px)]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#003061] text-[#ffbd92] sm:h-[2.45vw] sm:w-[2.45vw]"><ArrowRight className="h-5 w-5 sm:h-[1.45vw] sm:w-[1.45vw]" /></span>
            BOOK NOW
          </a>
          <a href="tel:8067903688" className="mt-4 flex items-center justify-center gap-3 font-black sm:mt-[1.15vw] sm:justify-start sm:gap-[.8vw]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffc69f] text-[#003061] sm:h-[2.7vw] sm:w-[2.7vw]"><Phone className="h-4 w-4 fill-current sm:h-[1.35vw] sm:w-[1.35vw]" /></span>
            <span className="text-[27px] tracking-[.015em] sm:text-[clamp(19px,2.25vw,43px)]">806-790-3688</span>
          </a>
          <p className="mt-1 text-[10px] font-bold tracking-[.35em] sm:mt-[.35vw] sm:text-[clamp(7px,.68vw,13px)]">WWW.YOURWEBSITE.COM</p>
        </div>
      </div>
    </section>
  )
}
