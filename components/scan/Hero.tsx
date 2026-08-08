"use client"

import Image from "next/image"
import { LuArrowRight, LuMessageCircle, LuPhone } from "react-icons/lu"
import { openBooking } from "./booking-bus"
import { track } from "./track"

const SANS = "var(--font-inter), ui-sans-serif, system-ui, sans-serif"

/* Two separate consented patient cases — each image is already its own
   before/after composite, so they are shown side by side as distinct results,
   never as one patient's progression. */
const RESULT_CASES = [
  {
    id: "case-1",
    src: "https://res.cloudinary.com/n0ccg2u6/image/upload/v1785392873/bf2_kvopn9.png",
    alt: "Patient result — hair density before and after the Hair Trinity Program",
  },
  {
    id: "case-2",
    src: "https://res.cloudinary.com/n0ccg2u6/image/upload/v1785392872/bf1_t5ienb.png",
    alt: "Patient result — crown coverage before and after the Hair Trinity Program",
  },
]

export default function Hero() {
  return (
    // the negative top margin pulls the hero under the sticky header, so the navy runs edge-to-edge behind it
    <section
      id="top"
      className="relative isolate -mt-[96px] overflow-hidden bg-[#16263f] pb-16 pt-[132px] sm:-mt-[106px] sm:pb-20 sm:pt-[150px] lg:pb-24 lg:pt-[168px]"
    >
      {/* layered brand light — peach warmth top-right, cool slate bottom-left */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_78%_-10%,rgba(252,203,182,0.30),transparent_62%),radial-gradient(80%_70%_at_0%_100%,rgba(58,83,127,0.55),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_60%_at_30%_20%,#000,transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
        {/* ---------------------------------------------------------------- */}
        {/* LEFT — copy + primary action                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="max-w-[600px]">
          <div className="rise" style={{ animationDelay: "0.05s" }}>
            <span
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] py-1.5 pl-1.5 pr-4 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur"
              style={{ fontFamily: SANS }}
            >
              <span className="rounded-full bg-[#fccbb6] px-2.5 py-1 text-[0.62rem] tracking-[0.12em] text-[#22395f]">
                Free
              </span>
              Hair &amp; Scalp Scan
            </span>
          </div>

          {/* `.reshape h1` hard-sets the navy brand colour, so white has to come through as an inline style */}
          <h1 className="rise mt-7 t-hero-title" style={{ animationDelay: "0.14s", color: "#ffffff" }}>
            Know exactly what your{" "}
            <span className="relative whitespace-nowrap italic text-[#fccbb6]">
              hair
              <svg
                className="absolute -bottom-1.5 left-0 h-[0.32em] w-full text-[#fccbb6]/60"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M1 6C22 2 60 1 99 4" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            needs — before you book.
          </h1>

          <p
            className="rise mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-white/70 sm:text-[1.08rem]"
            style={{ animationDelay: "0.22s" }}
          >
            Answer a few guided questions and add one photo of the affected area. Our specialists review your scan and
            walk into your consultation already knowing your case.
          </p>

          {/* actions */}
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "0.3s" }}>
            <button
              type="button"
              onClick={() => {
                track("book_click", { branch: "Reshape Clinic", source: "scan_hero" })
                openBooking()
              }}
              className="btn btn-wave group/cta w-full bg-[#fccbb6] text-[#22395f] shadow-[0_18px_40px_-16px_rgba(252,203,182,0.65)] hover:-translate-y-0.5 hover:bg-[#fde0d0] sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                <LuMessageCircle className="h-[1.05rem] w-[1.05rem]" />
                Let&apos;s Talk
                <LuArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
              </span>
            </button>

            <a
              href="tel:+918608551555"
              onClick={() => track("call_click", { branch: "Reshape Clinic" })}
              className="btn w-full border-white/20 bg-white/[0.06] text-white backdrop-blur transition-colors hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              <LuPhone className="h-4 w-4" />
              +91 86085 51555
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT — two separate patient result cases                         */}
        {/* ---------------------------------------------------------------- */}
        <div className="rise relative" style={{ animationDelay: "0.2s" }}>
          {/* halo behind the frame */}
          <div
            className="absolute -inset-6 -z-10 rounded-[48px] bg-[radial-gradient(60%_60%_at_70%_10%,rgba(252,203,182,0.35),transparent_65%),radial-gradient(60%_60%_at_20%_90%,rgba(255,255,255,0.14),transparent_65%)] blur-xl"
            aria-hidden
          />

          <figure className="overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.08] p-2.5 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.85)] backdrop-blur-md">
            <div className="grid grid-cols-2 gap-2.5">
              {RESULT_CASES.map((c) => (
                <div key={c.id} className="relative overflow-hidden rounded-[20px] bg-[#22395f]">
                  <div className="relative aspect-[3/4] sm:aspect-[7/10]">
                    <Image
                      src={c.src}
                      alt={c.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 46vw, 330px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            <figcaption
              className="flex items-center justify-between gap-3 px-3 pb-1 pt-3.5 text-[0.72rem] font-semibold text-white/60"
              style={{ fontFamily: SANS }}
            >
              <span>Two real patients · Hair Trinity Program</span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/80">Results vary</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
