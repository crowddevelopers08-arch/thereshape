"use client"

import { useEffect, useRef, useState } from "react"

/* placeholder photo blocks — swap each Before/After div for a real patient
   photo (e.g. <Image src="/images/dermet/results/1-before.jpg" .../>) when supplied */
const RESULTS = [
  { id: 1, label: "Male pattern baldness — 6 month result" },
  { id: 2, label: "Receding hairline — 8 month result" },
  { id: 3, label: "Crown thinning — 6 month result" },
  { id: 4, label: "Diffuse hair loss — 9 month result" },
  { id: 5, label: "Advanced hair loss — 12 month result" },
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

  return (
    <section id="results" className="scroll-mt-[100px] bg-white px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1180px] text-center">
        <h2 className="m-0 text-[1.6rem] font-bold leading-[1.35] tracking-[-0.01em] text-[#5f6f88] sm:text-[2.1rem]">
          Real Transformations. <span className="text-[#22395f]">Trusted Expertise.</span>
          <br />
          See the <span className="text-[#e8734a]">MAX&trade;</span> <span className="text-[#22395f]">Difference.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[560px] text-[0.9rem] leading-relaxed text-[#5f6f88]">
          Discover real results from{" "}
          <a href="#assessment-form" className="font-medium text-[#22395f] underline-offset-2 hover:underline">
            clients
          </a>{" "}
          who trusted MAX Hair Clinic for{" "}
          <a href="#assessment-form" className="font-medium text-[#22395f] underline-offset-2 hover:underline">
            effective
          </a>{" "}
          hair loss procedure.
        </p>

        <div
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {RESULTS.map((r) => (
            <div
              key={r.id}
              className="relative flex h-[260px] w-[85%] flex-none snap-start items-stretch overflow-hidden rounded-2xl bg-[#2c2c2c] shadow-[0_16px_34px_-18px_rgba(20,20,20,0.55)] sm:h-[300px] sm:w-[calc((100%-40px)/3)]"
            >
              <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-[#4a4a4a] to-[#242424] text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/45">
                Before
              </div>
              <div className="w-px flex-none bg-white/80" />
              <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-[#57616e] to-[#262b32] text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/45">
                After
              </div>
              <span className="sr-only">{r.label}</span>
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
