export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A1B3D] px-6 text-center">
      <span className="loading-word-box relative inline-block h-[1.1em] w-[14ch] font-mono text-2xl font-semibold tracking-wide text-[#FBA062] sm:text-3xl md:text-4xl">
        <span className="type-word type-word--hairfall absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap">
          Hairfall ?
        </span>
        <span className="type-word type-word--hairloss absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap">
          Hairloss ?
        </span>
        <span className="type-word type-word--baldness absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap">
          Baldness ?
        </span>
        <span className="type-cursor absolute inset-y-0 w-[3px] bg-[#FBA062]" aria-hidden="true" />
      </span>

      <style>{`
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
