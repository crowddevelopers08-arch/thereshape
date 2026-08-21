"use client";

import Image from "next/image";

function ScalpAssessmentIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none" stroke="#0f1e3d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 6v7M17 4v9M21 4v9M25 6v7" />
      <path d="M11 17c0-2 1-3 2-3M27 17c0-2-1-3-2-3" />
      <path d="M11 17v6c0 5 3.5 8 4.5 9.5M27 17v6c0 5-3.5 8-4.5 9.5" />
      <path d="M15.5 32.5c.6 1 1.6 1.5 2.5 1.5s1.9-.5 2.5-1.5" />
    </svg>
  );
}

function DoctorConsultationIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none" stroke="#0f1e3d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="12" r="6" />
      <path d="M8 34c0-7 5.4-12 12-12s12 5 12 12" />
    </svg>
  );
}

function TreatmentApproachIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none" stroke="#0f1e3d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="11" r="5" />
      <circle cx="27" cy="13" r="4" />
      <path d="M5 33c0-6 4-10.5 9-10.5s9 4.5 9 10.5" />
      <path d="M23 24.5c4 .5 7 4.3 7 8.5" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

const steps = [
  {
    n: "01",
    icon: ScalpAssessmentIcon,
    title: "Hair & Scalp Assessment",
    text: "Your hair and scalp concerns are evaluated in detail.",
  },
  {
    n: "02",
    icon: DoctorConsultationIcon,
    title: "Doctor Consultation",
    text: "The doctor discusses your concerns and determines the right direction.",
  },
  {
    n: "03",
    icon: TreatmentApproachIcon,
    title: "Personalised Approach",
    text: "A treatment approach is recommended based on your condition and suitability.",
  },
];

export default function Journey() {
  return (
    <section className="bg-white px-4 py-14 font-sans sm:px-8 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          {/* Left column */}
          <div>
            <h2 className="max-w-[560px] text-[28px] font-extrabold leading-[1.25] tracking-[-0.5px] text-[#0f1e3d] sm:text-[32px] lg:text-[34px]">
              At Reshape, Your Treatment Journey Starts With Understanding.
            </h2>

            <div className="mt-8 flex flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-0">
              {steps.map((step, i) => (
                <div key={step.n} className="flex flex-1 items-stretch">
                  <div className="flex-1 rounded-[14px] border border-[#e6e8ec] bg-white p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#e6e8ec]">
                        <step.icon />
                      </span>
                      <div>
                        <p className="text-[13px] font-extrabold text-[#8a8f99]">{step.n}</p>
                        <p className="text-[14.5px] font-bold leading-[1.25] text-[#0f1e3d]">{step.title}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-[13px] leading-[1.6] text-[#6b7280]">{step.text}</p>
                  </div>

                  {i < steps.length - 1 && (
                    <div className="hidden shrink-0 items-center justify-center px-3 sm:flex">
                      <ArrowRightIcon className="h-5 w-5 text-[#c7cbd3]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-8 flex w-full max-w-[440px] items-center justify-between rounded-[6px] bg-[#0f1e3d] px-6 py-4 text-[13px] font-bold tracking-[0.5px] text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              <span>START WITH A HAIR &amp; SCALP ASSESSMENT</span>
              <ArrowRightIcon />
            </button>
          </div>

          {/* Right column — image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#0f1e3d] shadow-[0_20px_50px_rgba(15,30,61,.15)] lg:aspect-auto lg:h-full lg:min-h-[360px]">
            <Image
              src="/hair-scalp-assessment-doctor.jpg"
              alt="Doctor performing a hair and scalp assessment"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            <button
              type="button"
              aria-label="Play video"
              className="group absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#0f1e3d]/80 shadow-lg ring-1 ring-white/40 transition-transform hover:scale-105"
            >
              <PlayIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
