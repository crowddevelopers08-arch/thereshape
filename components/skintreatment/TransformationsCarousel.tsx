"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { LuArrowRight } from "react-icons/lu"

const RESULTS = [
  { id: 1, src: "/before-images-1.png", label: "Acne and pigmentation — before and after treatment" },
  { id: 2, src: "/before-image-2.png", label: "Pigmentation and dark spots — before and after treatment" },
  { id: 3, src: "/before-image-3.png", label: "Acne scarring — before and after treatment" },
]

export default function TransformationsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollToIndex = (index: number) => {
    const track = trackRef.current
    const card = track?.children[index] as HTMLElement | undefined
    if (!track || !card) return
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" })
  }

  // keep the active dot in sync while the user swipes/drags the track
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[]
      let closest = 0
      let min = Infinity
      cards.forEach((card, i) => {
        const d = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft)
        if (d < min) {
          min = d
          closest = i
        }
      })
      setActive(closest)
    }
    track.addEventListener("scroll", onScroll, { passive: true })
    return () => track.removeEventListener("scroll", onScroll)
  }, [])

  // auto-advance through the results, one by one, looping back to the start.
  // Drives `active` directly (not scroll position) so the highlight still
  // cycles on desktop, where all 3 cards already fit with nothing to scroll.
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % RESULTS.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  // bring the active card into view too, for the mobile swipe layout
  useEffect(() => {
    scrollToIndex(active)
  }, [active])

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
        <div
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-3 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {RESULTS.map((r, i) => (
            <div
              key={r.id}
              className="relative aspect-square w-[90%] flex-none snap-start overflow-hidden rounded-2xl bg-[#f2f2f2] transition-all duration-700 ease-out sm:w-[calc((100%-40px)/3)]"
              style={{
                transform: active === i ? "scale(1.03)" : "scale(1)",
                boxShadow:
                  active === i
                    ? "0 20px 40px -16px rgba(34,57,95,0.45), 0 0 0 3px #fccbb6"
                    : "0 16px 34px -18px rgba(20,20,20,0.35)",
              }}
            >
              <Image
                src={r.src}
                alt={r.label}
                fill
                sizes="(min-width: 640px) 33vw, 85vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {RESULTS.map((r, i) => (
            <button
              key={r.id}
              type="button"
              aria-label={`Show result ${i + 1} of ${RESULTS.length}`}
              onClick={() => scrollToIndex(i)}
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
