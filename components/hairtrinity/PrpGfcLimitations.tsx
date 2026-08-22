"use client";

function DropletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#22395f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c3.2 4.4 5.6 7.8 5.6 11.2A5.6 5.6 0 1 1 6.4 14.2C6.4 10.8 8.8 7.4 12 3Z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#22395f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </svg>
  );
}

function VialIcon({ tint }: { tint: string }) {
  return (
    <svg viewBox="0 0 40 64" className="h-14 w-9">
      <rect x="14" y="2" width="12" height="7" rx="2" fill="#22395f" />
      <rect x="10" y="9" width="20" height="6" rx="1.5" fill="none" stroke="#22395f" strokeWidth="1.6" />
      <path
        d="M12 15h16v33a8 8 0 0 1-16 0V15Z"
        fill="none"
        stroke="#22395f"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d={`M12.8 30h14.4v18a7.2 7.2 0 0 1-14.4 0V30Z`} fill={tint} opacity="0.9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" stroke="#22395f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10.5 8 14l8-9" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 32 24" className="h-7 w-9" fill="var(--peach)" aria-hidden="true">
      <path d="M0 24V13.6C0 5.9 4.7.9 12.4 0l1 3.7C8.2 4.9 5.6 7.7 5.3 12H12v12H0Zm18 0V13.6C18 5.9 22.7.9 30.4 0l1 3.7c-5.2 1.2-7.8 4-8.1 8.3H30v12H18Z" />
    </svg>
  );
}

function SmallFactorIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
      style={{
        backgroundColor: "var(--navy-soft)",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

const supportChecklist = [
  "Supports hair follicle health",
  "May support the hair growth environment",
  "May help improve overall hair quality",
];

const multipleFactors = [
  { icon: "/icon-1.png", label: "Genetics & Family History" },
  { icon: "/icon-3.png", label: "Hormonal Factors" },
  { icon: "/icon-2.png", label: "Scalp Condition" },
  { icon: "/icon-5.png", label: "Nutritional Deficiencies" },
  { icon: "/icon-4.png", label: "Stress & Lifestyle Factors" },
  { icon: "/icon-8.png", label: "Overall Health Factors" },
  { icon: "/icon-6.png", label: "Environmental Factors" },
];

export default function PrpGfcLimitations() {
  return (
    <section id="limitations" className="scroll-mt-28 px-4 py-8 sm:px-8 lg:px-16 lg:py-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex items-center gap-3">
          <span className="h-px w-8" style={{ backgroundColor: "var(--line)" }} aria-hidden="true" />
          <p className="t-caption font-bold uppercase tracking-[1.5px]" style={{ color: "var(--muted)" }}>
            Understand Before You Treat
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-8">
          {/* Left — heading + intro */}
          <div>
            <h2 className="t-h2 uppercase leading-[1.15]" style={{ color: "var(--ink)" }}>
              Why Might{" "}
              <span className="hl inline-block">
                <span className="inline-block animate-[hairtrinity-word-colour_3.6s_ease-in-out_infinite]">PRP</span>{" "}
                <span className="inline-block animate-[hairtrinity-word-colour_3.6s_ease-in-out_0.3s_infinite]">or</span>{" "}
                <span className="inline-block animate-[hairtrinity-word-colour_3.6s_ease-in-out_0.6s_infinite]">GFC</span>{" "}
                <span className="inline-block animate-[hairtrinity-word-colour_3.6s_ease-in-out_0.9s_infinite]">Alone</span>
              </span>{" "}
              Not Address Every Cause of Hair Loss?
            </h2>

            <div className="mt-7 flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border"
                  style={{ borderColor: "var(--line)", backgroundColor: "var(--paper)" }}
                >
                  <DropletIcon />
                </span>
                <p className="t-body leading-[1.6]" style={{ color: "var(--muted)" }}>
                  PRP and GFC may support hair follicle health and help create a healthier environment for hair
                  growth.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border"
                  style={{ borderColor: "var(--line)", backgroundColor: "var(--paper)" }}
                >
                  <LayersIcon />
                </span>
                <p className="t-body leading-[1.6]" style={{ color: "var(--muted)" }}>
                  However, hair loss can involve multiple contributing factors, and a single approach may not
                  address every concern for every individual.
                </p>
              </div>
            </div>
          </div>

          {/* Right — two comparison cards with a divider badge */}
          <div className="relative grid grid-cols-1 items-stretch gap-10 sm:grid-cols-[1fr_1fr] sm:gap-6">
            {/* PRP / GFC card */}
            <div
              className="overflow-hidden rounded-[16px] border shadow-[0_16px_40px_-24px_rgba(22,38,63,0.35)]"
              style={{ borderColor: "var(--line)", backgroundColor: "var(--paper)" }}
            >
              <div className="px-6 py-5 text-center" style={{ backgroundColor: "var(--navy-deep)" }}>
                <p className="t-small font-bold uppercase tracking-[0.5px] text-white">PRP / GFC</p>
                <p className="t-caption mt-1 uppercase tracking-[1px]" style={{ color: "var(--peach)" }}>
                  What They May Support
                </p>
              </div>

              <div className="px-6 py-6">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <VialIcon tint="#c65a4a" />
                    <span
                      className="t-caption rounded-[4px] px-2.5 py-[3px] font-extrabold uppercase tracking-[0.5px]"
                      style={{ backgroundColor: "var(--peach)", color: "var(--navy-deep)" }}
                    >
                      PRP
                    </span>
                    <p className="t-caption text-center leading-[1.3]" style={{ color: "var(--muted)" }}>
                      Platelet-Rich
                      <br />
                      Plasma
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <VialIcon tint="#d9ac52" />
                    <span
                      className="t-caption rounded-[4px] px-2.5 py-[3px] font-extrabold uppercase tracking-[0.5px]"
                      style={{ backgroundColor: "var(--navy-soft)", color: "#ffffff" }}
                    >
                      GFC
                    </span>
                    <p className="t-caption text-center leading-[1.3]" style={{ color: "var(--muted)" }}>
                      Growth Factor
                      <br />
                      Concentrate
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2.5 border-t pt-5" style={{ borderColor: "var(--line)" }}>
                  {supportChecklist.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckIcon />
                      <p className="t-caption" style={{ color: "var(--ink)" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider badge */}
            <span
              className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full sm:grid"
              style={{ backgroundColor: "var(--navy-deep)" }}
              aria-hidden="true"
            >
              <span className="text-[18px] font-bold" style={{ color: "var(--peach)" }}>
                &ne;
              </span>
            </span>

            {/* Multiple factors card */}
            <div
              className="overflow-hidden rounded-[16px] border"
              style={{ borderColor: "var(--line)", backgroundColor: "var(--paper)" }}
            >
              <div className="px-6 py-5 text-center" style={{ backgroundColor: "var(--peach-soft)" }}>
                <p className="t-small font-bold uppercase leading-[1.3] tracking-[0.5px]" style={{ color: "var(--ink)" }}>
                  Hair Loss Can Involve Multiple Factors
                </p>
              </div>

              <div
                className="relative overflow-hidden px-6 py-6"
                style={{
                  height: "260px",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
                  maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
                }}
              >
                <div className="marquee-y gap-3.5">
                  {[...multipleFactors, ...multipleFactors].map((f, i) => (
                    <div key={`${f.label}-${i}`} className="flex items-center gap-3">
                      <SmallFactorIcon src={f.icon} />
                      <p className="t-caption font-semibold" style={{ color: "var(--ink)" }}>
                        {f.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote banner */}
        <div
          className="relative mt-10 overflow-hidden rounded-[16px] px-6 py-8 sm:px-10 sm:py-10"
          style={{ backgroundColor: "var(--navy-deep)" }}
        >
          <QuoteIcon />
          <p className="t-h4 mt-3 leading-[1.4] text-white">The goal is not just choosing a popular treatment.</p>
          <p className="t-h4 mt-1 font-bold leading-[1.4]" style={{ color: "var(--peach)" }}>
            The goal is understanding what&rsquo;s actually causing your hair loss.
          </p>
        </div>
      </div>
    </section>
  );
}
