export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0A1B3D] px-6 text-center">
      <p className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">Dr. Aneesha</p>

      <span className="relative inline-block h-[1.1em] w-[13ch] font-mono text-2xl font-semibold tracking-wide text-[#FBA062] sm:text-3xl md:text-4xl">
        <span className="type-word type-word--loss absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap">
          Hair Loss
        </span>
        <span className="type-word type-word--fall absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap">
          Hair Fall
        </span>
        <span className="type-cursor absolute inset-y-0 w-[3px] bg-[#FBA062]" aria-hidden="true" />
      </span>

      <style>{`
        @keyframes typeLoss {
          0%      { width: 0;    animation-timing-function: steps(9, end); }
          23.08%  { width: 11ch; animation-timing-function: steps(1, end); }
          34.62%  { width: 11ch; animation-timing-function: steps(9, end); }
          46.15%  { width: 0;    animation-timing-function: steps(1, end); }
          100%    { width: 0; }
        }
        @keyframes typeFall {
          0%      { width: 0;    animation-timing-function: steps(1, end); }
          50%     { width: 0;    animation-timing-function: steps(9, end); }
          73.08%  { width: 11ch; animation-timing-function: steps(1, end); }
          84.62%  { width: 11ch; animation-timing-function: steps(9, end); }
          96.15%  { width: 0;    animation-timing-function: steps(1, end); }
          100%    { width: 0; }
        }
        .type-word--loss {
          animation: typeLoss 5.2s infinite;
        }
        .type-word--fall {
          animation: typeFall 5.2s infinite;
        }
        @keyframes cursorMove {
          0%      { left: 0;    animation-timing-function: steps(9, end); }
          23.08%  { left: 11ch; animation-timing-function: steps(1, end); }
          34.62%  { left: 11ch; animation-timing-function: steps(9, end); }
          46.15%  { left: 0;    animation-timing-function: steps(1, end); }
          50%     { left: 0;    animation-timing-function: steps(9, end); }
          73.08%  { left: 11ch; animation-timing-function: steps(1, end); }
          84.62%  { left: 11ch; animation-timing-function: steps(9, end); }
          96.15%  { left: 0;    animation-timing-function: steps(1, end); }
          100%    { left: 0; }
        }
        .type-cursor {
          animation: cursorMove 5.2s infinite, cursorBlink 0.8s steps(1, end) infinite;
        }
        @keyframes cursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
