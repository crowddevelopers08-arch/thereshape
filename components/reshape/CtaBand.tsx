"use client"

import Reveal from "./Reveal"
import { track } from "./track"

export default function CtaBand() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-[#fccbb6] to-[#fef1ea] shadow-[0_30px_70px_-40px_rgba(34,57,95,0.4)]">
          <div className="grid grid-cols-1 items-center md:grid-cols-[1.55fr_1fr]">
            {/* LEFT — copy + button */}
            <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
              <h2 className="text-[clamp(1.5rem,3.4vw,2.5rem)] font-bold leading-[1.1] text-[#22395f]">
                New Advanced Hair Trinity Program
              </h2>
              <p className="mt-3 flex flex-wrap gap-x-2.5 gap-y-1 text-[0.95rem] font-medium text-[#22395f]/75">
                <span>Personalized</span>
                <span className="text-[#22395f]/40">•</span>
                <span>Effective Treatment</span>
                <span className="text-[#22395f]/40">•</span>
                <span>Advanced Hair Regrowth</span>
              </p>
              <a
                href="#book"
                onClick={() => track("book_click", { branch: "Reshape Clinic" })}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#22395f] px-7 py-3.5 text-[0.9rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#16263f]"
              >
                Book Your Consultation
                <span aria-hidden>→</span>
              </a>
            </div>

            {/* RIGHT — image (mobile: full-width banner; desktop: diagonal cut) */}
            <div className="relative h-52 w-full sm:h-60 md:h-full md:min-h-[240px]">
              <img
                src="https://res.cloudinary.com/n0ccg2u6/image/upload/cta_udfkkp.png"
                alt="thereshape — Advanced Hair Trinity Program"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center md:[clip-path:polygon(24%_0,100%_0,100%_100%,0%_100%)]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
