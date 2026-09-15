export default function Loading() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 text-center"
      style={{ background: "radial-gradient(circle at 50% 32%, #132b52 0%, #0A1B3D 65%)" }}
    >
      {/* brand mark */}
      <div className="flex flex-col items-center gap-2">
        <svg viewBox="0 0 24 24" className="h-9 w-9 -rotate-45 text-[#FBA062]" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path d="M12 2c-4 4-8 8-8 13a8 8 0 0 0 16 0c0-5-4-9-8-13Z" />
          <path d="M12 8v13" />
        </svg>
        <div className="text-xl font-bold leading-none text-white">Reshape</div>
        <div className="text-[0.7rem] tracking-wide text-white/50">Hair&nbsp;|&nbsp;Skin&nbsp;|&nbsp;You</div>
      </div>

      {/* status */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/40">
          Personalizing your consultation for
        </p>

        <span className="loading-word-box relative inline-block h-[1.3em] w-[12ch] font-mono text-xl font-semibold tracking-wide text-[#FBA062] sm:text-2xl">
          <span className="type-word type-word--hairfall absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap">
            Hairfall ?
          </span>
          <span className="type-word type-word--hairloss absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap">
            Hairloss ?
          </span>
          <span className="type-word type-word--baldness absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap">
            Baldness ?
          </span>
          <span className="type-cursor absolute inset-y-0 w-[2px] bg-[#FBA062]" aria-hidden="true" />
        </span>
      </div>

      {/* determinate progress bar — mirrors the actual ~7s wait */}
      <div className="h-[3px] w-[220px] overflow-hidden rounded-full bg-white/10 sm:w-[260px]">
        <div className="progress-fill h-full rounded-full" style={{ background: "linear-gradient(90deg,#F3C4A4,#FBA062)" }} />
      </div>

      <style>{`
        .progress-fill {
          width: 0%;
          animation: progressFill 7s cubic-bezier(0.3, 0, 0.2, 1) forwards;
        }
        @keyframes progressFill {
          0%   { width: 0%; }
          85%  { width: 92%; }
          100% { width: 100%; }
        }

        .loading-word-box {
          contain: layout paint;
        }
        .type-word {
          will-change: width;
        }
        .type-cursor {
          will-change: left, opacity;
        }
        @keyframes typeHairfall {
          0%      { width: 0;    animation-timing-function: steps(10, end); }
          16%     { width: 12ch; animation-timing-function: steps(1, end); }
          22.67%  { width: 12ch; animation-timing-function: steps(10, end); }
          30.67%  { width: 0;    animation-timing-function: steps(1, end); }
          100%    { width: 0; }
        }
        @keyframes typeHairloss {
          0%      { width: 0;    animation-timing-function: steps(1, end); }
          33.33%  { width: 0;    animation-timing-function: steps(10, end); }
          49.33%  { width: 12ch; animation-timing-function: steps(1, end); }
          56%     { width: 12ch; animation-timing-function: steps(10, end); }
          64%     { width: 0;    animation-timing-function: steps(1, end); }
          100%    { width: 0; }
        }
        @keyframes typeBaldness {
          0%      { width: 0;    animation-timing-function: steps(1, end); }
          66.67%  { width: 0;    animation-timing-function: steps(10, end); }
          82.67%  { width: 12ch; animation-timing-function: steps(1, end); }
          89.33%  { width: 12ch; animation-timing-function: steps(10, end); }
          97.33%  { width: 0;    animation-timing-function: steps(1, end); }
          100%    { width: 0; }
        }
        .type-word--hairfall {
          animation: typeHairfall 7.5s infinite;
        }
        .type-word--hairloss {
          animation: typeHairloss 7.5s infinite;
        }
        .type-word--baldness {
          animation: typeBaldness 7.5s infinite;
        }
        @keyframes cursorMove {
          0%      { left: 0;    animation-timing-function: steps(10, end); }
          16%     { left: 12ch; animation-timing-function: steps(1, end); }
          22.67%  { left: 12ch; animation-timing-function: steps(10, end); }
          30.67%  { left: 0;    animation-timing-function: steps(1, end); }
          33.33%  { left: 0;    animation-timing-function: steps(10, end); }
          49.33%  { left: 12ch; animation-timing-function: steps(1, end); }
          56%     { left: 12ch; animation-timing-function: steps(10, end); }
          64%     { left: 0;    animation-timing-function: steps(1, end); }
          66.67%  { left: 0;    animation-timing-function: steps(10, end); }
          82.67%  { left: 12ch; animation-timing-function: steps(1, end); }
          89.33%  { left: 12ch; animation-timing-function: steps(10, end); }
          97.33%  { left: 0;    animation-timing-function: steps(1, end); }
          100%    { left: 0; }
        }
        .type-cursor {
          animation: cursorMove 7.5s infinite, cursorBlink 0.8s steps(1, end) infinite;
        }
        @keyframes cursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
