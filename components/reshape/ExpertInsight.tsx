"use client"

import { FaPlay } from "react-icons/fa"
import { LuArrowRight } from "react-icons/lu"
import Reveal from "./Reveal"

/**
 * Expert Insight — a two-column video feature: copy + CTAs on the left, a video
 * thumbnail (with play button, caption and stat badges) on the right.
 *
 * The play button is a placeholder — wire it to your real video (a modal, a
 * YouTube/Vimeo embed, etc.) via the `onPlay` handler below.
 */
export default function ExpertInsight() {
  const onPlay = () => {
    // TODO: open your video (modal / embed). No video source is wired yet.
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
            Dr. Aneesha M explains how our evidence-based Hair Trinity Program targets the root cause of hair loss —
            for safe, natural-looking, and long-lasting results.
          </p>
        </Reveal>

        {/* video (mobile: sits between paragraph and CTAs) */}
        <Reveal index={1} className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="relative overflow-hidden rounded-[26px] shadow-[0_40px_90px_-40px_rgba(34,57,95,0.55)] ring-1 ring-inset ring-white/20">
            <div className="relative aspect-[16/9]">
              {/* thumbnail — replace src with a real still of Dr. Aneesha M */}
              <img
                src="/docaneesha.png"
                alt="Dr. Aneesha M, Aesthetic Physician"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* subtle depth wash */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#16263f]/35 to-transparent"
                aria-hidden="true"
              />

              {/* play button */}
              <button
                type="button"
                onClick={onPlay}
                aria-label="Play video"
                className="group absolute left-1/2 top-1/2 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#22395f] shadow-xl backdrop-blur transition-transform duration-200 hover:scale-110"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" aria-hidden="true" />
                <FaPlay className="relative ml-1 h-6 w-6" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* actions — CTAs (mobile: below the video) */}
        <Reveal index={2} className="min-w-0 lg:col-start-1 lg:row-start-2 lg:mt-8 lg:self-start">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={onPlay} className="btn btn-primary group/btn">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                <FaPlay className="ml-0.5 h-2.5 w-2.5" />
              </span>
              Watch Dr. Aneesha&apos;s insights
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
