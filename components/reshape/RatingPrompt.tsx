"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { track } from "./track"
import { GOOGLE_REVIEW_URL, GOOGLE_REVIEW_FALLBACK_URL, REVIEW_LINK_IS_PLACEHOLDER } from "./config"

/** 4 and above goes to Google; 3 and below goes to the private feedback form. */
const POSITIVE_FROM = 4

/** Falls back to a Maps search while the real g.page link is unset. */
const GMB_URL = REVIEW_LINK_IS_PLACEHOLDER ? GOOGLE_REVIEW_FALLBACK_URL : GOOGLE_REVIEW_URL

const STARS = [1, 2, 3, 4, 5]

/** Index 0 is the resting face, then one per star. */
const FACES = ["😌", "😞", "😕", "😐", "🙂", "😍"]

export default function RatingPrompt() {
  const [hovered, setHovered] = useState(0)
  const [picked, setPicked] = useState(0)

  // Hover previews the fill, but once a choice is locked in it wins — otherwise
  // the stars flicker back as the pointer drifts during the redirect delay.
  const shown = picked || hovered

  const choose = (value: number) => {
    if (picked) return // already navigating
    setPicked(value)

    const positive = value >= POSITIVE_FROM
    track("review_rating", { rating: value, outcome: positive ? "google" : "feedback" })

    // Let the fill land before the page changes, so the tap registers visually.
    window.setTimeout(() => {
      if (positive) {
        window.location.href = GMB_URL
      } else {
        // Carry the score across so the feedback row records what triggered it.
        window.location.href = `/client-feedback?rating=${value}`
      }
    }, 450)
  }

  return (
    <div className="flex flex-col items-center">
      {/* face reacts to the score being previewed or chosen */}
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[22px] border border-[#e7ecf3] bg-[#fbf8f5] sm:h-20 sm:w-20">
        <span key={shown} aria-hidden className="animate-scale-in text-[2.1rem] leading-none sm:text-[2.4rem]">
          {FACES[shown]}
        </span>
      </div>

      {/* `.reshape h1` already paints navy, so no inline colour is needed here */}
      <h1 className="mt-6 text-center text-[clamp(1.3rem,4.6vw,1.9rem)] leading-tight">How was your experience?</h1>
      <p className="mx-auto mt-2.5 max-w-[34ch] text-center text-[0.92rem] leading-relaxed text-[#5f6f88] sm:text-[0.98rem]">
        Please rate your visit. Your feedback helps us improve our care.
      </p>

      <div
        role="group"
        aria-label="Rate your experience out of 5"
        className="mt-7 flex items-center justify-center gap-2 sm:gap-2.5"
        onMouseLeave={() => setHovered(0)}
      >
        {STARS.map((value) => {
          const filled = value <= shown
          return (
            <button
              key={value}
              type="button"
              disabled={!!picked}
              aria-label={`${value} star${value === 1 ? "" : "s"}`}
              onMouseEnter={() => setHovered(value)}
              onFocus={() => setHovered(value)}
              onBlur={() => setHovered(0)}
              onClick={() => choose(value)}
              className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl border transition-all duration-200 focus-visible:outline-none disabled:cursor-default sm:h-14 sm:w-14 ${
                filled
                  ? "-translate-y-0.5 border-[#fccbb6] bg-[#fef5ef]"
                  : "border-[#e7ecf3] bg-[#fbf8f5] hover:border-[#fccbb6]"
              }`}
            >
              {/* empty stars need a mid-tone, not the --line hairline token —
                  #e7ecf3 on the cream tile reads as no star at all */}
              <Star
                className={`h-5 w-5 transition-colors duration-200 sm:h-6 sm:w-6 ${
                  filled ? "fill-[#22395f] text-[#22395f]" : "fill-[#b8c4d6] text-[#b8c4d6]"
                }`}
              />
            </button>
          )
        })}
      </div>

      {/* doubles as the live region so the outcome is announced, not just seen */}
      <p
        aria-live="polite"
        className="mt-5 min-h-[1.1rem] text-center text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#22395f]"
      >
        {picked
          ? picked >= POSITIVE_FROM
            ? "Thank you — taking you to Google"
            : "Thank you — one more step"
          : "Select your rating"}
      </p>
    </div>
  )
}
