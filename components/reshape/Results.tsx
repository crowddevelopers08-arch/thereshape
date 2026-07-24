"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { LuChevronLeft, LuChevronRight, LuQuote } from "react-icons/lu"
import Reveal from "./Reveal"

/* Placeholder image — replace each `image` with a real, consented patient photo
   (e.g. drop files in /public/images and point here). */
const RESULTS = [
  {
    name: "Priya",
    image: "/bf1.png",
    quote: "I can already see healthier, thicker hair after completing my Hair Trinity sessions.",
  },
  {
    name: "Ganesh",
    image: "/bf2.png",
    quote: "The treatment improved my hair density, and my hair feels much fuller now.",
  },
]

export default function Results() {
  const [index, setIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const maxIndex = RESULTS.length - 1

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1))
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1))

  return (
    <section id="results" className="border-b border-[#e7ecf3] bg-[#fbf8f5] py-12 sm:py-14 lg:py-16 max-[470px]:py-6">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="kicker justify-center">Patients Results</p>
        </Reveal>

        <div className="mt-12 max-[470px]:mt-6">
          {/* Mobile: Carousel */}
          {isMobile ? (
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {RESULTS.map((r) => (
                    <div key={r.name} className="w-full shrink-0 grow-0 px-3">
                      <ResultCard r={r} isMobile={true} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrows */}
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute -left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] shadow-lg transition-all hover:border-[#fccbb6] hover:bg-[#fef5ef]"
              >
                <LuChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute -right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] shadow-lg transition-all hover:border-[#fccbb6] hover:bg-[#fef5ef]"
              >
                <LuChevronRight className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: RESULTS.length }).map((_, i) => (
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
          ) : (
            /* Desktop: Grid */
            <div className="grid grid-cols-2 gap-6 lg:max-w-4xl lg:mx-auto">
              {RESULTS.map((r) => (
                <div key={r.name}>
                  <ResultCard r={r} isMobile={false} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  A single before/after testimonial card.                                    */
/* -------------------------------------------------------------------------- */
function ResultCard({ r, isMobile }: { r: (typeof RESULTS)[number]; isMobile: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e7ecf3] bg-white shadow-[0_26px_60px_-38px_rgba(34,57,95,0.45)]">
      {/* image - reduced height on mobile */}
      <div className={`relative w-full overflow-hidden bg-white ${isMobile ? 'max-h-72' : 'max-h-80'}`}>
        <Image
          src={r.image}
          alt={r.name}
          width={400}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>

      {/* quote panel */}
      <div className="flex flex-1 flex-col bg-[#fdf2ec] p-6">
        <LuQuote className="h-7 w-7 flex-none -scale-x-100 text-[#fccbb6]" />
        <p className="mt-3 flex-1 text-[1.02rem] leading-relaxed text-[#1f2f47]">{r.quote}</p>
        <div className="mt-5 border-t border-[#efdccf] pt-4">
          <div className="display text-[1.1rem] font-bold text-[#22395f]">{r.name}</div>
        </div>
      </div>
    </article>
  )
}