"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { LuArrowRight } from "react-icons/lu"

const RESULTS = [
  { id: 1, src: "/consult-1.jpeg", label: "Hair transplant — before and after result" },
  { id: 2, src: "/consult-2.jpeg", label: "Hair transplant — before and after result" },
  { id: 3, src: "/consult-3.png", label: "Hair restoration — before and after result" },
  { id: 4, src: "/consult-4.png", label: "Hair restoration — before and after result" },
]

export default function TransformationsCarousel() {
  const [active, setActive] = useState(0)

  // all 4 images sit in view together — auto-advance just moves the
  // highlight from one to the next, no scrolling needed
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % RESULTS.length)
    }, 2000)
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

        {/* all 4 images, one row from sm: up; the active one highlights in turn */}
        <div className="mx-auto mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {RESULTS.map((r, i) => (
            <div
              key={r.id}
              className="relative aspect-square overflow-hidden rounded-2xl bg-[#f2f2f2] transition-all duration-700 ease-out"
              style={{
                transform: active === i ? "scale(1.05)" : "scale(1)",
                boxShadow:
                  active === i
                    ? "0 20px 40px -16px rgba(34,57,95,0.45), 0 0 0 3px #fccbb6"
                    : "0 10px 24px -14px rgba(20,20,20,0.3)",
                zIndex: active === i ? 10 : 1,
              }}
            >
              <Image
                src={r.src}
                alt={r.label}
                fill
                sizes="(min-width: 640px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
