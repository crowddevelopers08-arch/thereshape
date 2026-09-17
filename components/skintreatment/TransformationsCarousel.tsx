"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { LuArrowRight } from "react-icons/lu"

const RESULTS = [
  { id: 1, src: "/before-images-1.png", label: "Acne and pigmentation — before and after treatment" },
  { id: 2, src: "/before-image-2.png", label: "Pigmentation and dark spots — before and after treatment" },
  { id: 3, src: "/before-image-3.png", label: "Acne scarring — before and after treatment" },
]

export default function TransformationsCarousel() {
  const [active, setActive] = useState(0)

  // auto-advance, one slide at a time, looping back to the start
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % RESULTS.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="results" className="scroll-mt-[100px] bg-white px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1280px] text-center">
        <h2 className="m-0 flex items-center justify-center gap-3 text-[1.6rem] font-bold leading-[1.35] tracking-[-0.01em] text-[#5f6f88] sm:gap-4 sm:text-[2.1rem]">
          <span>Before</span>
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#fccbb6] text-[#22395f] sm:h-10 sm:w-10">
            <LuArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <span className="text-[#22395f]">After</span>
        </h2>

        <div className="mx-auto mt-3 flex items-center justify-center gap-2" aria-hidden="true">
          <span
            className="h-[6px] w-[6px] rounded-full bg-[#fccbb6]"
            style={{ animation: "tc-dot-pulse 1.6s ease-in-out infinite" }}
          />
          <span className="relative h-[3px] w-[56px] overflow-hidden rounded-full bg-[#fccbb6]/25">
            <span
              className="absolute inset-y-0 w-1/3 rounded-full bg-[#fccbb6]"
              style={{ animation: "tc-line-sweep 2.2s ease-in-out infinite" }}
            />
          </span>
          <span
            className="h-[6px] w-[6px] rounded-full bg-[#fccbb6]"
            style={{ animation: "tc-dot-pulse 1.6s ease-in-out infinite", animationDelay: "0.7s" }}
          />
        </div>
        <style>{`
          @keyframes tc-dot-pulse {
            0%, 100% { opacity: 0.35; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1); }
          }
          @keyframes tc-line-sweep {
            0% { left: -35%; }
            100% { left: 100%; }
          }
        `}</style>

        {/* single-slide auto-sliding carousel — translateX guarantees visible
            movement, unlike relying on native scroll (which had nothing to
            scroll to once all cards already fit the row on desktop) */}
        <div className="relative mx-auto mt-8 w-full max-w-[420px] overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {RESULTS.map((r) => (
              <div key={r.id} className="w-full flex-none px-1 py-6">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-[0_16px_34px_-18px_rgba(20,20,20,0.35)]">
                  <Image src={r.src} alt={r.label} fill sizes="420px" className="object-cover" priority={r.id === 1} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-2">
          {RESULTS.map((r, i) => (
            <button
              key={r.id}
              type="button"
              aria-label={`Show result ${i + 1} of ${RESULTS.length}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                active === i ? "w-6 bg-[#22395f]" : "w-2 bg-[#d8dee8] hover:bg-[#b7c2d3]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
