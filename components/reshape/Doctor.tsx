"use client"

import { LuArrowRight } from "react-icons/lu"
import { FaAward, FaUsers } from "react-icons/fa"
import Reveal from "./Reveal"

const EXPERTISE = [
  "Hair Trinity Program",
  "Hair Fall & Hair Thinning Treatment",
  "Scalp Analysis & Hair Growth Planning",
  "PRP & Regenerative Hair Therapies",
  "Non-Surgical Hair Restoration",
  "Personalized Hair Care Solutions",
]

export default function Doctor() {
  return (
    <section id="doctor" className="border-b border-[#e7ecf3] bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* LEFT — portrait seated on a soft grey blob with floating badges. */}
        <Reveal className="relative mx-auto w-full max-w-[440px]">
          <div className="relative aspect-square">
            {/* dotted texture behind the blob */}
            <div
              className="absolute right-1 top-2 h-28 w-28"
              aria-hidden="true"
              style={{
                backgroundImage: "radial-gradient(rgba(34,57,95,0.16) 1.4px, transparent 1.4px)",
                backgroundSize: "13px 13px",
              }}
            />
            <div
              className="absolute bottom-6 left-0 h-24 w-24"
              aria-hidden="true"
              style={{
                backgroundImage: "radial-gradient(rgba(34,57,95,0.14) 1.4px, transparent 1.4px)",
                backgroundSize: "13px 13px",
              }}
            />

            {/* grey blob holding the portrait — clipped to the circle so the
                image never overflows the round. Replace src with a real photo. */}
            <div className="absolute inset-[4%] overflow-hidden rounded-full bg-[#e8e9ee]">
              <img
                src="/docaneesha.png"
                alt="Dr. Aneesha M, Aesthetic Physician"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              {/* fade the base into the blob */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-[#e8e9ee] to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* badge — experience (top-left) */}
            <div className="float absolute -left-2 top-[8%] z-20 flex items-center gap-3 rounded-[20px] bg-white px-4 py-3 shadow-[0_20px_45px_-18px_rgba(34,57,95,0.45)]">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#fef5ef] text-[#22395f]">
                <FaAward className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="display text-[1.05rem] font-bold text-[#22395f]">5+ Years</div>
                <div className="text-[0.72rem] font-semibold text-[#5f6f88]">Experience</div>
              </div>
            </div>

            {/* badge — happy patients (bottom-centre) */}
            <div
              className="float absolute -bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-[20px] bg-white px-4 py-3 shadow-[0_20px_45px_-18px_rgba(34,57,95,0.45)]"
              style={{ animationDelay: "1.2s" }}
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#fef5ef] text-[#22395f]">
                <FaUsers className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="display text-[1.05rem] font-bold text-[#22395f]">20000+</div>
                <div className="text-[0.72rem] font-semibold text-[#5f6f88]">Happy Patients</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* RIGHT — heading, credentials, bio, expertise, CTA. */}
        <Reveal index={1} className="min-w-0">
          <p className="kicker">Meet Our Specialist</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)]">Dr. Aneesha M</h2>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem] font-semibold text-[#22395f]">
            <span>Aesthetic Physician</span>
            <span className="text-[#fccbb6]">•</span>
            <span className="text-[#5f6f88]">B.D.S., F.D.S., F.M.C.</span>
          </div>
          <p className="mt-1 text-[0.9rem] font-medium text-[#5f6f88]">
            5+ Years of Experience in Aesthetic &amp; Hair Care
          </p>

          <p className="mt-6 max-w-[62ch] text-[1.02rem] leading-relaxed text-[#5f6f88]">
            With over 5 years of clinical experience, Dr. Aneesha M specializes in advanced hair restoration and
            aesthetic treatments. She focuses on delivering personalized, evidence-based solutions to help patients
            reduce hair fall, improve hair density, and achieve natural-looking results.
          </p>
          <p className="mt-4 max-w-[62ch] text-[1.02rem] leading-relaxed text-[#5f6f88]">
            Using advanced diagnostic techniques and customized treatment plans, she ensures every patient receives
            safe, effective, and scientifically guided care tailored to their unique hair concerns.
          </p>

          {/* expertise — seamless auto-scrolling marquee within this column */}
          <div className="mt-7 w-full min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
            <div className="marquee gap-3">
              {[...EXPERTISE, ...EXPERTISE].map((e, i) => (
                <span
                  key={i}
                  aria-hidden={i >= EXPERTISE.length}
                  className="inline-flex flex-none items-center gap-2 whitespace-nowrap rounded-full border border-[#e7ecf3] bg-white px-4 py-2 text-[0.9rem] font-medium text-[#1f2f47]"
                >
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#fccbb6] text-[0.7rem] font-bold text-[#22395f]">
                    ✓
                  </span>
                  {e}
                </span>
              ))}
            </div>
          </div>

          <a href="#book" className="btn btn-primary group/btn mt-9">
            Book Your Consultation
            <LuArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
