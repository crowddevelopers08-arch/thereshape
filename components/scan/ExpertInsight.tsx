"use client"

import { useRef } from "react"
import { FaPlay } from "react-icons/fa"
import Reveal from "./Reveal"

/**
 * Expert Insight — a two-column video feature: copy + CTA on the left, a real
 * video on the right (native controls).
 *
 * Drop your clip at /public/expert-insight.mp4 (or change the <video src>).
 */
export default function ExpertInsight() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const onPlay = () => {
    const v = videoRef.current
    if (!v) return
    v.scrollIntoView({ behavior: "smooth", block: "center" })
    v.play().catch(() => {
      /* user gesture / autoplay policy — ignore */
    })
  }

  return (
    <section id="insight" className="border-b border-[#e7ecf3] bg-[#eef1f4] py-14 sm:py-16 lg:py-20 max-[470px]:py-6">
      <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-10 px-5 sm:px-8 lg:grid lg:grid-cols-[5fr_4fr] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-20 lg:gap-y-0">
        {/* intro — badge + heading + paragraph */}
        <Reveal className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-end">
          <span className="inline-flex items-center rounded-full border border-[#c9d2e0] bg-white px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#3a537f]">
            Expert Insight
          </span>

          <h2 className="mt-6 text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.08]">
            Healthy hair starts with the right diagnosis
          </h2>

          <p className="mt-5 max-w-[48ch] text-[1.02rem] leading-relaxed text-[#5f6f88]">
            Dr. Aneesha M explains how our evidence based Hair Trinity Program targets the root cause of hair loss
            for safe, natural looking, and long lasting results.
          </p>
        </Reveal>

        {/* video (mobile: sits between paragraph and CTA) */}
        <Reveal index={1} className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="relative overflow-hidden rounded-[26px] shadow-[0_40px_90px_-40px_rgba(34,57,95,0.55)] ring-1 ring-inset ring-white/20">
            <div className="relative aspect-[16/9] bg-[#16263f]">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/n0ccg2u6/video/upload/video_lo1eqb.mp4"
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* actions — CTA (mobile: below the video) */}
        <Reveal index={2} className="min-w-0 lg:col-start-1 lg:row-start-2 lg:mt-8 lg:self-start">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={onPlay} className="btn btn-primary btn-wave group/btn">
              <span className="relative z-10 inline-flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <FaPlay className="ml-0.5 h-2.5 w-2.5" />
                </span>
                Watch Dr. Aneesha&apos;s insights
              </span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
