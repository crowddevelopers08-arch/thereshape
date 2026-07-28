"use client"

import { LuSyringe, LuDroplet, LuZap } from "react-icons/lu"
import { FaAward } from "react-icons/fa"
import Reveal from "./Reveal"

const FEATURES = [
  {
    icon: LuSyringe,
    title: "Targeted Scalp Care",
    desc: "Intradermal and meso-based scalp applications using selected ingredients according to the recommended protocol.",
  },
  {
    icon: LuDroplet,
    title: "Nutritional Support",
    desc: "Doctor-guided IV nutrient support may be considered depending on individual requirements and suitability.",
  },
  {
    icon: LuZap,
    title: "Scalp Care + LLLT",
    desc: "Clinical scalp care combined with Low-Level Laser Therapy (LLLT) as part of a personalised program.",
  },
]

export default function Program() {
  return (
    <section id="program" className="border-b border-[#e7ecf3] bg-white py-14 sm:py-16 lg:py-20 max-[470px]:py-6">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 px-5 sm:px-8 lg:grid lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-16 lg:gap-y-0">
        {/* label + heading + subheading (mobile: first; desktop: top-right) */}
        <Reveal className="lg:col-start-2 lg:row-start-1 lg:self-end">
          <p className="kicker">Introducing Hair Trinity</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)]">Three Approaches. One Personalised Program.</h2>
          <p className="mt-3 text-[1.05rem] font-semibold leading-snug text-[#22395f]">
            Hair and scalp concerns can have different contributing factors, which is why the same approach may not
            suit everyone.
          </p>
        </Reveal>

        {/* portrait with decorative shapes + floating award badge (mobile: after the subheading; desktop: left column, spanning both rows) */}
        <Reveal
          index={1}
          className="relative mx-auto mt-2 w-full max-w-[440px] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-none lg:self-center"
        >
          <div className="relative aspect-[4/5] w-full">
            {/* decorative diagonal accent shapes behind the image */}
            <div
              className="absolute -right-4 top-6 h-[70%] w-[60%] rounded-[26px] bg-[#22395f]"
              style={{ transform: "rotate(8deg)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -right-2 top-10 h-[65%] w-6 rounded-full bg-[#fccbb6]"
              style={{ transform: "rotate(8deg)" }}
              aria-hidden="true"
            />
            <div
              className="absolute right-10 -top-4 h-16 w-6 rounded-full bg-[#fccbb6]"
              style={{ transform: "rotate(8deg)" }}
              aria-hidden="true"
            />

            {/* image */}
            <div className="absolute inset-0 overflow-hidden rounded-[26px]">
              <img
                src="https://res.cloudinary.com/n0ccg2u6/image/upload/imtwo_qcwozm.webp"
                alt="Reshape Clinic — Hair Trinity Program"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* floating badge — bottom-left, overlapping the image like an award seal */}
            <div className="float absolute -bottom-4 -left-4 z-20 flex items-center gap-3 rounded-[20px] bg-white px-4 py-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#fef5ef] text-[#22395f]">
                <FaAward className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="display text-[1.05rem] font-bold text-[#22395f]">Certified</div>
                <div className="text-[0.72rem] font-semibold text-[#5f6f88]">Clinic &amp; Specialists</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* paragraph + feature rows (mobile: after the image; desktop: bottom-right) */}
        <Reveal index={2} className="lg:col-start-2 lg:row-start-2 lg:mt-0 lg:self-start">
          <p className="max-w-[52ch] text-[0.98rem] leading-relaxed text-[#5f6f88]">
            Hair Trinity brings together targeted scalp therapy, nutritional support, and advanced scalp care
            technology. Your protocol is selected following consultation and clinical assessment.
          </p>

          <div className="mt-7 flex flex-col gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[#fef5ef] text-[#22395f]">
                  <f.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-[1.02rem] font-bold text-[#1f2f47]">{f.title}</h3>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-[#5f6f88]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
