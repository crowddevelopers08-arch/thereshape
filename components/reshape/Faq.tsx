"use client"

import { useState } from "react"
import Reveal from "./Reveal"

const FAQS = [
  {
    q: "What is the Hair Trinity Program?",
    a: "An advanced combination hair restoration program designed to strengthen hair follicles, reduce hair fall, and improve hair density.",
  },
  {
    q: "Is the treatment suitable for men and women?",
    a: "Yes. The Hair Trinity Program is customized for both men and women experiencing hair loss or thinning.",
  },
  {
    q: "How many sessions will I need?",
    a: "The number of sessions depends on your hair condition and goals. Your doctor will recommend a personalized treatment plan after your consultation.",
  },
  {
    q: "Is the procedure safe?",
    a: "Yes. Treatments are performed by certified aesthetic doctors using FDA approved technology and internationally accepted safety protocols.",
  },
  {
    q: "When will I start seeing results?",
    a: "Most patients begin noticing improvements after completing the recommended treatment sessions. Results vary depending on the individual's hair condition and adherence to the treatment plan.",
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="border-b border-[#e7ecf3] bg-white py-14 sm:py-16 lg:py-20 max-[470px]:py-6">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-10 px-5 sm:px-8 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-16 lg:gap-y-6">
        {/* heading (mobile: first) */}
        <Reveal className="lg:col-start-1 lg:row-start-1 lg:sticky lg:top-24 lg:self-start">
          <p className="kicker">FAQ</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)]">Frequently Asked Questions</h2>
        </Reveal>

        {/* accordion */}
        <Reveal index={1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="divide-y divide-[#eef2f7] border-y border-[#eef2f7]">
            {FAQS.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-[1.05rem] font-semibold transition-colors ${isOpen ? "text-[#22395f]" : "text-[#1f2f47]"}`}>
                      {f.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border text-[1.1rem] transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-[#22395f] bg-[#22395f] text-white"
                          : "border-[#e7ecf3] text-[#22395f]"
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-12 text-[0.98rem] leading-relaxed text-[#5f6f88]">{f.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
