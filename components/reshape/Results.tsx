"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { LuChevronLeft, LuChevronRight, LuQuote } from "react-icons/lu"
import { FaStar } from "react-icons/fa"
import Reveal from "./Reveal"

/* Placeholder image — replace each `image` with a real, consented patient photo
   (e.g. drop files in /public/images and point here). */
const RESULTS = [
  {
    name: "Priya",
    image: "https://placehold.co/720x560/22395f/fccbb6/png?text=Priya&font=lora",
    quote: "I can already see healthier, thicker hair after completing my Hair Trinity sessions.",
  },
  {
    name: "Ganesh",
    image: "https://placehold.co/720x560/22395f/fccbb6/png?text=Ganesh&font=lora",
    quote: "The treatment improved my hair density, and my hair feels much fuller now.",
  },
  {
    name: "Ram",
    image: "https://placehold.co/720x560/22395f/fccbb6/png?text=Ram&font=lora",
    quote: "The personalized Hair Trinity Program gave me natural-looking results beyond my expectations.",
  },
  {
    name: "Murali",
    image: "https://placehold.co/720x560/22395f/fccbb6/png?text=Murali&font=lora",
    quote: "Professional doctors, advanced treatment, and visible results. I'm very happy with my progress.",
  },
]

/** Cards visible at once: 1 (mobile) · 2 (tablet) · 3 (large screens). */
function usePerView() {
  const [pv, setPv] = useState(1)
  useEffect(() => {
    const mq2 = window.matchMedia("(min-width: 640px)")
    const mq3 = window.matchMedia("(min-width: 1024px)")
    const update = () => setPv(mq3.matches ? 3 : mq2.matches ? 2 : 1)
    update()
    mq2.addEventListener("change", update)
    mq3.addEventListener("change", update)
    return () => {
      mq2.removeEventListener("change", update)
      mq3.removeEventListener("change", update)
    }
  }, [])
  return pv
}

export default function Results() {
  const perView = usePerView()
  const maxIndex = Math.max(0, RESULTS.length - perView)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // keep the index valid when the visible count changes
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  // auto-advance
  useEffect(() => {
    if (paused || maxIndex === 0) return
    const id = setInterval(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), 4500)
    return () => clearInterval(id)
  }, [paused, maxIndex])

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1))
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1))

  return (
    <section id="results" className="border-b border-[#e7ecf3] bg-[#fbf8f5] py-12 sm:py-14 lg:py-16 max-[470px]:py-6">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="kicker justify-center">Patients Results</p>
          {/* <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)]">Patients Results</h2> */}
        </Reveal>

        <div
          className="relative mt-12 max-[470px]:mt-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
            >
              {RESULTS.map((r) => (
                <div key={r.name} className="w-full shrink-0 grow-0 px-3" style={{ flexBasis: `${100 / perView}%` }}>
                  <ResultCard r={r} />
                </div>
              ))}
            </div>
          </div>

          {/* arrows */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute -left-3 top-[32%] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] shadow-lg transition-all hover:border-[#fccbb6] hover:bg-[#fef5ef] max-sm:hidden"
          >
            <LuChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute -right-3 top-[32%] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] shadow-lg transition-all hover:border-[#fccbb6] hover:bg-[#fef5ef] max-sm:hidden"
          >
            <LuChevronRight className="h-5 w-5" />
          </button>

          {/* dots */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-[#22395f]" : "w-2 bg-[#22395f]/25 hover:bg-[#22395f]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  A single before/after testimonial card.                                    */
/* -------------------------------------------------------------------------- */
function ResultCard({ r }: { r: (typeof RESULTS)[number] }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e7ecf3] bg-white shadow-[0_26px_60px_-38px_rgba(34,57,95,0.45)]">
      {/* image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <Image
          src={r.image}
          alt={r.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* quote panel */}
      <div className="flex flex-1 flex-col bg-[#fdf2ec] p-6">
        <LuQuote className="h-7 w-7 flex-none -scale-x-100 text-[#fccbb6]" />
        <p className="mt-3 flex-1 text-[1.02rem] leading-relaxed text-[#1f2f47]">{r.quote}</p>
        <div className="mt-5 border-t border-[#efdccf] pt-4">
          <div className="display text-[1.1rem] font-bold text-[#22395f]">{r.name}</div>
          <div className="mt-1.5 flex items-center gap-1 text-[#22395f]" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="h-3.5 w-3.5" />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
