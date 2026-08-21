"use client";

import Image from "next/image";

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ml-1 h-5 w-5 text-white"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

const steps = [
  {
    n: "01",
    icon: "/icon-5.png",
    title: "Hair & Scalp Assessment",
    text: "Your hair and scalp concerns are evaluated in detail.",
  },
  {
    n: "02",
    icon: "/icons-1.png",
    title: "Doctor Consultation",
    text: "The doctor discusses your concerns and determines the right direction.",
  },
  {
    n: "03",
    icon: "/icons-2.png",
    title: "Personalised Approach",
    text: "A treatment approach is recommended based on your condition and suitability.",
  },
];

export default function Journey() {
  return (
    <section id="journey" className="scroll-mt-28 bg-white px-4 py-8 font-sans sm:px-8 lg:px-16 lg:py-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-0 sm:gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          {/* Left column */}
          <div className="max-sm:contents">
            <h2 className="max-w-[560px] text-[28px] font-extrabold leading-[1.25] tracking-[-0.5px] text-[#0f1e3d] max-sm:order-1 sm:text-[32px] lg:text-[34px]">
              At Reshape, Your Treatment Journey Starts With Understanding.
            </h2>

            <div className="mt-8 flex flex-col gap-3 max-sm:order-3 sm:flex-row sm:items-stretch sm:gap-0">
              {steps.map((step, i) => (
                <div key={step.n} className="flex flex-1 items-stretch">
                  <div className="flex-1 rounded-[14px] border border-[#e6e8ec] bg-white p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#e6e8ec]">
                        <Image src={step.icon} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                      </span>
                      <div>
                        <p className="text-[13px] font-extrabold text-[#8a8f99]">
                          {step.n}
                        </p>
                        <p className="text-[14.5px] font-bold leading-[1.25] text-[#0f1e3d]">
                          {step.title}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-[13px] leading-[1.6] text-[#6b7280]">
                      {step.text}
                    </p>
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
              onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="btn-wave mt-8 flex w-full max-w-[440px] items-center justify-between rounded-full bg-[#22395f] px-6 py-4 text-[13px] font-semibold tracking-[0.5px] text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#16263f] max-sm:order-4 sm:w-auto"
            >
              <span className="relative z-10">START WITH A HAIR &amp; SCALP ASSESSMENT</span>
              <span className="relative z-10 flex items-center">
                <ArrowRightIcon />
              </span>
            </button>
          </div>

          {/* Right column — image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#0f1e3d] max-sm:order-2 max-sm:mt-7 lg:aspect-auto lg:h-full lg:min-h-[360px]">
            <video
              src="https://res.cloudinary.com/n0ccg2u6/video/upload/video_lo1eqb.mp4"
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
