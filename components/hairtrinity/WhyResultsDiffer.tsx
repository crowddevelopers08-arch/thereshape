"use client";

function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#fccbb6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6.5 6.5 0 0 0-3.8 11.8c.6.4 1 1.1 1 1.9V17h5.6v-.3c0-.8.3-1.5 1-1.9A6.5 6.5 0 0 0 12 3Z" />
    </svg>
  );
}

function QuestionMarkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#22395f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.3a2.4 2.4 0 1 1 3.7 2c-.8.6-1.3 1-1.3 2.1" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#22395f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="#22395f" stroke="none" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill={filled ? "#fccbb6" : "none"} stroke="#fccbb6" strokeWidth="1.2" strokeLinejoin="round">
      <path d="M10 2.2 12.4 7.4l5.6.6-4.2 3.8 1.2 5.6L10 14.6l-5 2.8 1.2-5.6-4.2-3.8 5.6-.6L10 2.2Z" />
    </svg>
  );
}

const factors = [
  "Genetics & Family History",
  "Scalp Condition",
  "Hormonal Factors",
  "Lifestyle & Stress",
];

const testimonials = [
  {
    badge: "TRIED PRP",
    badgeBg: "#fccbb6",
    badgeText: "#16263f",
    stars: 3,
    quote: "I completed multiple sessions, but didn't see the noticeable improvement I was hoping for.",
    outcome: "Little to No Noticeable Change",
  },
  {
    badge: "TRIED GFC",
    badgeBg: "#3a537f",
    badgeText: "#ffffff",
    stars: 3,
    quote: "I tried multiple sessions, but my hair fall and thinning continued.",
    outcome: "Minimal Noticeable Change",
  },
  {
    badge: "TRIED A GENERAL HAIR TREATMENT",
    badgeBg: "#16263f",
    badgeText: "#ffffff",
    stars: 2,
    quote: "I followed a general treatment plan, but the results were limited for my specific concern.",
    outcome: "Limited Results for My Concern",
  },
  {
    badge: "TRIED MINOXIDIL",
    badgeBg: "#22395f",
    badgeText: "#ffffff",
    stars: 3,
    quote: "I used it consistently for months, but the regrowth was patchy and slower than I expected.",
    outcome: "Slow, Uneven Regrowth",
  },
  {
    badge: "TRIED HAIR SUPPLEMENTS",
    badgeBg: "#fde0d0",
    badgeText: "#16263f",
    stars: 2,
    quote: "I took supplements for months, but noticed little difference in my hair fall.",
    outcome: "No Significant Change",
  },
];

export default function WhyResultsDiffer() {
  return (
    <section id="why-results" className="scroll-mt-28 px-4 py-8 sm:px-8 lg:px-16 lg:py-10" style={{ backgroundColor: "var(--navy-deep)" }}>
      <div className="mx-auto max-w-[1320px]">
        {/* Header */}
        <div className="mx-auto max-w-[920px] text-center">
          <h2 className="t-h2 flex flex-wrap items-baseline justify-center gap-x-[0.22em] uppercase max-sm:gap-y-2" style={{ color: "#ffffff" }}>
            <span className="max-sm:w-full">Why Doesn&rsquo;t the</span>
            <span className="inline-block max-sm:whitespace-nowrap max-sm:!text-[clamp(20px,6.2vw,24px)]">
              <span className="inline-block animate-[hairtrinity-dark-word-colour_4.2s_ease-in-out_infinite]">Same</span>{" "}
              <span className="inline-block animate-[hairtrinity-dark-word-colour_4.2s_ease-in-out_0.45s_infinite]">Hair</span>{" "}
              <span className="inline-block animate-[hairtrinity-dark-word-colour_4.2s_ease-in-out_0.9s_infinite]">Treatment</span>
            </span>
            {/* <span style={{ color: "var(--peach)" }}>Work for Everyone?</span> */}
            <span className="max-sm:w-full">Work for Everyone?</span>
          </h2>
          <p className="t-body-lg mt-4 text-white/70">
            Hair loss can have different causes, so the same treatment may not work the same way for everyone.
          </p>
        </div>

        {/* Content grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 max-sm:mt-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:gap-10">
          {/* Left — factors */}
          <div>
            <p className="t-caption font-bold uppercase tracking-[1.5px]" style={{ color: "var(--peach)" }}>
             Factors that can influence your treatment response:
            </p>

            <div
              className="mt-5 grid grid-cols-2 overflow-hidden rounded-[12px] border"
              style={{ borderColor: "rgba(252,203,182,0.24)", backgroundColor: "rgba(34,57,95,0.6)" }}
            >
              {factors.map((label, index) => (
                <div
                  key={label}
                  className={`flex min-h-20 items-center justify-center px-3 py-5 text-center ${
                    index % 2 === 0 ? "border-r" : ""
                  } ${index < 2 ? "border-b" : ""}`}
                  style={{ borderColor: "rgba(252,203,182,0.18)" }}
                >
                  <p className="t-caption font-semibold leading-[1.35] text-white/90">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — real patient experiences, slow auto-scrolling row */}
          <div>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px flex-1 border-t border-dashed" style={{ borderColor: "rgba(252,203,182,0.3)" }} aria-hidden="true" />
              <p className="t-caption whitespace-nowrap font-bold uppercase tracking-[1.5px]" style={{ color: "var(--peach)" }}>
                Real Patient Experiences
              </p>
              <span className="h-px flex-1 border-t border-dashed" style={{ borderColor: "rgba(252,203,182,0.3)" }} aria-hidden="true" />
            </div>

            <div
              className="relative mt-5 overflow-hidden"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              }}
            >
              <div className="marquee gap-4">
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div
                    key={`${t.badge}-${i}`}
                    className="w-[300px] shrink-0 rounded-[14px] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    style={{ backgroundColor: "var(--paper)" }}
                  >
                    <span
                      className="t-caption inline-block rounded-[4px] px-3 py-[5px] font-extrabold uppercase tracking-[0.5px]"
                      style={{ backgroundColor: t.badgeBg, color: t.badgeText }}
                    >
                      {t.badge}
                    </span>

                    <div className="mt-3 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <StarIcon key={s} filled={s < t.stars} />
                      ))}
                    </div>

                    <p className="t-small mt-3 leading-[1.65]" style={{ color: "var(--muted)" }}>
                      <span style={{ color: "var(--navy-soft)" }}>&ldquo;</span>
                      {t.quote}
                      <span style={{ color: "var(--navy-soft)" }}>&rdquo;</span>
                    </p>

                    <p className="t-caption mt-4 font-extrabold uppercase tracking-[0.5px]" style={{ color: "var(--navy-soft)" }}>
                      Outcome:
                    </p>
                    <p className="t-small font-bold leading-[1.3]" style={{ color: "var(--ink)" }}>
                      {t.outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
