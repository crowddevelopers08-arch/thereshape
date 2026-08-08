"use client"

import Image from "next/image"
import { LuArrowRight, LuMessageCircle } from "react-icons/lu"
import { openBooking } from "./booking-bus"
import { track } from "./track"

const SANS = "var(--font-inter), ui-sans-serif, system-ui, sans-serif"

/* Branded results creative — a square, self-contained panel that already carries
   its own before/after framing, clinic logo and trust row, so the hero shows it
   whole rather than dressing it in a second frame. */
const RESULTS_IMAGE = {
  src: "/scan.png",
  alt: "thereshape patient results — before and after the Hair Trinity Program, with natural results, safe and effective treatment and expert care",
}

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

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
        {/* ---------------------------------------------------------------- */}
        {/* LEFT — copy + primary action                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="max-w-[600px]">
          <div className="rise" style={{ animationDelay: "0.05s" }}>
            <span
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur"
              style={{ fontFamily: SANS }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#fccbb6]" aria-hidden />
              Hair &amp; Scalp Assessment
            </span>
          </div>

          {/* `.reshape h1` hard-sets the navy brand colour, so white has to come through as an inline style */}
          <h1 className="rise mt-7 t-hero-title" style={{ animationDelay: "0.14s", color: "#ffffff" }}>
            Know exactly what your{" "}
            <span className="relative whitespace-nowrap italic text-[#fccbb6]">
              hair
              {/* filled brush stroke rather than a stroked line — a stroke can only end
                  round or square, so the taper to a point has to come from the outline */}
              <svg
                className="absolute -bottom-1.5 left-0 h-[0.32em] w-full text-[#fccbb6]/60"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M0.5 6.1C22 2.3 62 1 99.5 3.3C62 3.7 22 5.2 0.5 6.1Z"
                  fill="currentColor"
                />
              </svg>
            </span>{" "}
            needs before you book.
          </h1>

          <p
            className="rise mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-white/70 sm:text-[1.08rem]"
            style={{ animationDelay: "0.22s" }}
          >
            Answer a few guided questions and add one photo of the affected area. Our specialists review your scan and
            walk into your consultation already knowing your case.
          </p>

          {/* on mobile the proof sits between the copy and the CTA; on desktop the
              right-hand column carries it instead and this instance is not rendered */}
          <ResultsPanel className="mt-9 lg:hidden" />

          {/* action */}
          <div className="rise mt-9" style={{ animationDelay: "0.3s" }}>
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
                Start Your Assessment
                <LuArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
              </span>
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT — branded patient results panel (desktop only)              */}
        {/* ---------------------------------------------------------------- */}
        <ResultsPanel className="hidden lg:block" />
      </div>
    </section>
  )
}

/**
 * The results creative. Rendered twice — inline between the copy and the CTA on
 * mobile, and in the right-hand column on desktop — with the inactive one set to
 * `display: none`, so it never leaves an empty grid track behind.
 */
function ResultsPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`rise relative ${className}`} style={{ animationDelay: "0.2s" }}>
      {/* halo behind the frame */}
      <div
        className="absolute -inset-6 -z-10 rounded-[48px] bg-[radial-gradient(60%_60%_at_70%_10%,rgba(252,203,182,0.35),transparent_65%),radial-gradient(60%_60%_at_20%_90%,rgba(255,255,255,0.14),transparent_65%)] blur-xl"
        aria-hidden
      />

      {/* the creative is square, so capping its width is what controls its height */}
      <figure className="mx-auto max-w-[400px] sm:max-w-[440px] lg:max-w-[480px]">
        <div className="relative aspect-square overflow-hidden rounded-[26px] border border-white/15 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.85)]">
          <Image
            src={RESULTS_IMAGE.src}
            alt={RESULTS_IMAGE.alt}
            fill
            priority
            sizes="(max-width: 1024px) 440px, 480px"
            className="object-cover"
          />
        </div>
      </figure>
    </div>
  )
}
