"use client"

import { LuShieldCheck, LuCheck } from "react-icons/lu"
import Reveal from "./Reveal"

const REASONS = [
  "Certified Hair Specialists",
  "Personalized Treatment Plans",
  "FDA-Approved Technology",
  "Premium Medical Grade Products",
  "International Treatment Protocols",
  "Patient First Approach",
  "Comfortable Clinical Environment",
]

export default function WhyReshape() {
  return (
    <section id="why" className="bg-[#f4f5f7] py-12 sm:py-14 lg:py-18">
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-5 lg:grid-cols-[1fr_1.1fr]">
          {/* LEFT — content only */}
          <Reveal className="flex min-w-0 flex-col rounded-[26px] border border-[#e7ecf3] bg-white p-7 sm:p-8">
            <h3 className="display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.1] text-[#22395f]">
              Why Reshape
            </h3>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fef5ef] px-3 py-1.5 text-[0.7rem] font-bold text-[#22395f]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fccbb6]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22395f]" />
                </span>
                Advanced hair restoration &amp; aesthetic care
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fef5ef] px-3 py-1.5 text-[0.7rem] font-bold text-[#22395f]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fccbb6]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22395f]" />
                </span>
                Certified Clinic
              </span>
            </div>

            <p className="mt-4 text-[0.95rem] leading-relaxed text-[#5f6f88]">
              At Reshape Clinic, we combine advanced medical science, modern hair restoration technology, and
              personalized care to help you achieve healthier, stronger hair with confidence designed by certified
              aesthetic doctors using evidence based protocols.
            </p>

            <ul className="mt-6 grid flex-1 auto-rows-fr grid-cols-2 gap-2.5">
              {REASONS.map((r, i) => (
                <li
                  key={r}
                  className={`flex h-full items-center gap-2 rounded-xl border border-[#e7ecf3] bg-[#fbf8f5] px-3 py-2.5 text-[0.82rem] font-medium leading-tight text-[#1f2f47] ${
                    i === REASONS.length - 1 ? "col-span-2" : ""
                  }`}
                >
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#fccbb6] text-[#22395f]">
                    <LuCheck className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* RIGHT — image + stat bento */}
          <Reveal index={1} className="grid min-w-0 grid-rows-[1.25fr_1fr] gap-4 sm:gap-5 lg:min-h-[600px]">
            {/* top wide image */}
            <div className="relative overflow-hidden rounded-[26px]">
              <img
                src="https://res.cloudinary.com/n0ccg2u6/image/upload/imone_zqxsmm.webp"
                alt="Reshape Clinic"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* bottom row */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {/* image card */}
              <div className="relative overflow-hidden rounded-[26px]">
                <img
                  src="https://res.cloudinary.com/n0ccg2u6/image/upload/imtwo_yxdvu1.webp"
                  alt="Comfortable clinical environment"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* image card */}
              <div className="relative overflow-hidden rounded-[26px]">
                <img
                  src="https://res.cloudinary.com/n0ccg2u6/image/upload/imthree_cnbv7a.webp"
                  alt="Reshape Clinic"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
