export default function Loading() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 text-center"
      style={{ background: "radial-gradient(circle at 50% 32%, #132b52 0%, #0A1B3D 65%)" }}
    >
      {/* brand mark */}
      <div className="flex flex-col items-center gap-2.5">

        <div className="text-2xl font-bold leading-none text-white sm:text-3xl">Reshape</div>
        <div className="text-sm tracking-wide text-white/50 sm:text-base">Hair&nbsp;|&nbsp;Skin&nbsp;</div>
      </div>

      {/* status */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 sm:text-sm">
          Personalizing your consultation for
        </p>

        <span className="loading-word-box relative inline-block h-[1.3em] w-[12ch] font-mono text-3xl font-semibold tracking-wide text-[#FBA062] sm:text-4xl md:text-5xl">
          <span className="type-word type-word--hairfall absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap">
            Hairfall ?
          </span>
          <span className="type-word type-word--hairloss absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap">
            Hairloss ?
          </span>
          <span className="type-word type-word--baldness absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap">
            Baldness ?
          </span>
          <span className="type-cursor absolute inset-y-0 w-[3px] bg-[#FBA062] sm:w-[4px]" aria-hidden="true" />
        </span>
      </div>

      {/* determinate progress bar — mirrors the actual ~7s wait */}
      <div className="h-[4px] w-[240px] overflow-hidden rounded-full bg-white/10 sm:h-[5px] sm:w-[320px] md:w-[380px]">
        <div className="progress-fill h-full rounded-full" style={{ background: "linear-gradient(90deg,#F3C4A4,#FBA062)" }} />
      </div>

      <style>{`
        .progress-fill {
          width: 0%;
          animation: progressFill 5s cubic-bezier(0.3, 0, 0.2, 1) forwards;
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
          animation: typeHairfall 5s infinite;
        }
        .type-word--hairloss {
          animation: typeHairloss 5s infinite;
        }
        .type-word--baldness {
          animation: typeBaldness 5s infinite;
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
          animation: cursorMove 5s infinite, cursorBlink 0.8s steps(1, end) infinite;
        }
        @keyframes cursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
