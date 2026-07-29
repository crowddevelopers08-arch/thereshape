"use client"

import { useEffect, useState } from "react"
import { LuSyringe, LuDroplet, LuZap, LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { FaAward } from "react-icons/fa"
import Reveal from "./Reveal"

const FEATURES = [
  {
    icon: LuSyringe,
    title: "Targeted Scalp Care",
    desc: "Intradermal and meso based scalp applications using selected ingredients according to the protocol.",
    image: "/images-2.jpg",
  },
  {
    icon: LuDroplet,
    title: "Nutritional Support",
    desc: "Doctor guided IV nutrient support may be considered depending on individual requirements and suitability.",
    image: "/images-3.jpg",
  },
  {
    icon: LuZap,
    title: "Scalp Care + LLLT",
    desc: "Clinical scalp care combined with Low Level Laser Therapy (LLLT) as part of a personalised program.",
    image: "/images-1.jpg",
  },
]

export default function Program() {
  const [index, setIndex] = useState(0)
  const maxIndex = FEATURES.length - 1

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1))
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1))

  useEffect(() => {
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [])

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

        {/* 3. description */}
        <Reveal index={2} className="mt-3 lg:col-start-1 lg:row-start-3">
          <p className="text-[1.05rem] font-semibold leading-snug text-[#22395f]">
            Hair and scalp concerns can have different contributing factors, which is why the same approach may not
            suit everyone.
          </p>
        </Reveal>

        {/* 4. card section — carousel of the three approaches (mobile: right after the description; desktop: right column spanning all rows) */}
        <Reveal
          index={3}
          className="mt-8 lg:col-start-2 lg:row-start-1 lg:row-span-5 lg:mt-0 lg:flex lg:h-full lg:flex-col lg:justify-center"
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

        {/* 5. paragraph */}
        <Reveal index={4} className="mt-4 lg:col-start-1 lg:row-start-4">
          <p className="max-w-[52ch] text-[0.98rem] leading-relaxed text-[#5f6f88]">
            Hair Trinity brings together targeted scalp therapy, nutritional support, and advanced scalp care
            technology. Your protocol is selected following consultation and clinical assessment.
          </p>
        </Reveal>

        {/* 6. certified badge */}
        <Reveal index={5} className="mt-8 lg:col-start-1 lg:row-start-5">
          <div className="float inline-flex w-fit items-center gap-3 rounded-[20px] border border-[#e7ecf3] bg-white px-4 py-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#fef5ef] text-[#22395f]">
              <FaAward className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="display text-[1.05rem] font-bold text-[#22395f]">Certified</div>
              <div className="text-[0.72rem] font-semibold text-[#5f6f88]">Clinic &amp; Specialists</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
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
