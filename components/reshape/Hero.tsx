"use client"

import { track } from "./track"

const CHIPS = ["Personalized", "Effective Treatment", "Advanced Hair Regrowth"]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* animated atmosphere */}
      <div className="aurora" aria-hidden>
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="grid-tex absolute inset-0 z-0 opacity-60" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center px-5 py-14 text-center sm:px-8 sm:py-20 lg:py-24">
        <div className="rise d1 mb-7 inline-flex items-center gap-2 rounded-full border border-[#fccbb6] bg-[#fef5ef] px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#22395f]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22395f]" />
          New Advanced Hair Trinity Program
        </div>

        <h1 className="t-hero-title rise d2">
          New Advanced
          <br />
          <span className="hl">Hair Trinity</span> Program
        </h1>

        <div className="rise d3 mt-8 flex flex-wrap justify-center gap-2.5">
          {CHIPS.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-2 rounded-full border border-[#e7ecf3] bg-white px-4 py-2 text-[0.85rem] font-semibold text-[#22395f]"
            >
              <span className="text-[#fccbb6]">✦</span>
              {c}
            </span>
          ))}
        </div>

        <div className="rise d4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#book" onClick={() => track("book_click", { branch: "Reshape Clinic" })} className="btn btn-primary">
            Book Your Consultation
            <span aria-hidden>→</span>
          </a>
          <a
            href="tel:+919150010389"
            onClick={() => track("call_click", { branch: "Reshape Clinic" })}
            className="btn btn-ghost"
          >
            Call +91 91500 10389
          </a>
        </div>
      </div>
    </section>
  )
}
