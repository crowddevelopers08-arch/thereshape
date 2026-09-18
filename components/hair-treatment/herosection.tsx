"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, ClipboardList, Microscope, Phone, Star, Stethoscope } from "lucide-react"

const trustItems = (rating: string) => [
  { label: <>{rating} / 5<br />Rated Treatment</>, icon: Star },
  { label: <>Experienced<br />Dermet</>, icon: Stethoscope },
  { label: <>Advanced<br />Equipment</>, icon: Microscope },
  { label: <>Personalized<br />Treatment Plan</>, icon: ClipboardList },
]

function TrustItem({ label, icon: Icon }: { label: React.ReactNode; icon: typeof Star }) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl bg-white/65 px-2 py-2 text-left shadow-[0_8px_22px_rgba(122,63,33,.08)] backdrop-blur-[2px] sm:gap-[.8vw] sm:rounded-2xl sm:px-[.9vw] sm:py-[.75vw]">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#ff9a65,#ff7046)] text-white shadow-[0_8px_14px_rgba(255,112,70,.18)] sm:h-[3.15vw] sm:w-[3.15vw] sm:max-h-[60px] sm:max-w-[60px]">
        <Icon className="h-3.5 w-3.5 stroke-[2.2] sm:h-[1.65vw] sm:w-[1.65vw]" />
      </span>
      <span className="text-[9px] font-bold leading-[1.15] text-[#062e5a] sm:text-[clamp(10px,1.03vw,20px)]">{label}</span>
    </div>
  )
}

export default function HairTreatmentHeroSection() {
  const [days, setDays] = useState(0)

  useEffect(() => {
    const duration = 1200
    const startedAt = performance.now()
    let frameId = 0

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      setDays(Math.round(90 * (1 - Math.pow(1 - progress, 3))))

      if (progress < 1) frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [])

  const rating = ((days / 90) * 4.9).toFixed(1)

  return (
    <section className="relative isolate overflow-hidden bg-[#002e5c] font-[var(--font-merriweather)]">
      <Image
        src="/banner-hair.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none hidden object-cover object-center sm:block"
      />
      <Image
        src="/hair-mbles.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center sm:hidden"
      />

      <div className="relative mx-auto min-h-[700px] max-w-[1920px] sm:min-h-0 sm:aspect-[2.285/1] sm:px-[7vw] sm:py-0">
        {/* Copy and treatment advantages */}
        <div className="absolute left-5 top-[6%] z-10 w-[90%] sm:left-[10.3%] sm:top-[18.5%] sm:w-[36%] sm:max-w-none">
          <h1 className="!m-0 text-[30px] font-black leading-[1.1] tracking-[-.055em] text-[#002c5b] sm:text-[clamp(28px,3.55vw,68px)]">
            Hair Care in<br />Chennai , Mylapore
          </h1>
          <div className="mt-3 h-1 w-20 rounded-full bg-[#ff784b] sm:mt-[1.4vw] sm:h-[.32vw] sm:w-[7.1vw]" />
          <p className="mt-4 text-[32px] font-black leading-[1.08] tracking-[-.055em] text-[#002c5b] sm:mt-[1.4vw] sm:text-[clamp(29px,3.55vw,68px)]">
            Get Your Hair Back<br />
            <span className="text-[#ff7045]">in {days} Days</span>
          </p>

          <div className="mt-5 grid max-w-[340px] grid-cols-2 gap-2 sm:absolute sm:left-0 sm:top-[calc(100%+1.55vw)] sm:mt-0 sm:w-full sm:max-w-none sm:gap-[.65vw]">
            {trustItems(rating).map((item, index) => <TrustItem key={index} {...item} />)}
          </div>
        </div>


        {/* Contact block */}
        <div className="absolute left-1/2 top-[49%] z-20  sm:w-[58%] -translate-x-1/2 text-left text-white sm:bottom-[12.5%] sm:left-auto sm:right-[3.1%] sm:top-auto sm:w-fit sm:translate-x-0">
          <a href="#assessment-form" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#002c5b] px-4 py-2.5 text-[13px] font-black text-white transition hover:scale-[1.02] sm:w-auto sm:gap-[1vw] sm:bg-[linear-gradient(90deg,#ffc69f,#ffc096)] sm:px-[1.3vw] sm:py-[.85vw] sm:text-[clamp(11px,1.15vw,22px)] sm:text-[#003061]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#002c5b] sm:h-[2.45vw] sm:w-[2.45vw] sm:bg-[#003061] sm:text-[#ffbd92]"><ArrowRight className="h-4 w-4 sm:h-[1.45vw] sm:w-[1.45vw]" /></span>
            BOOK NOW
          </a>
          <a href="tel:8067903688" className="mt-4 hidden items-center justify-center gap-3 font-black sm:mt-[1.15vw] sm:flex sm:justify-start sm:gap-[.8vw]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffc69f] text-[#003061] sm:h-[2.7vw] sm:w-[2.7vw]"><Phone className="h-4 w-4 fill-current sm:h-[1.35vw] sm:w-[1.35vw]" /></span>
            <span className="text-[27px] tracking-[.015em] sm:text-[clamp(19px,2.25vw,43px)]">+91 86085 51555</span>
          </a>
        </div>
      </div>
    </section>
  )
}
