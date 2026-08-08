/**
 * Single-line footer — just the legal line, a way to call, and the privacy link.
 * Deliberately minimal so the scan page keeps its focus on the assessment.
 */
export default function Footer() {
  return (
    // data-no-cine: too short to ever clear CinematicScroll's bottom rootMargin,
    // so it would sit at opacity 0 forever if it opted into the reveal
    <footer data-no-cine className="border-t border-[#e7ecf3] bg-[#fbf8f5]">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-5 py-4 text-center text-[0.78rem] text-[#5f6f88] sm:justify-between sm:px-8 sm:text-left">
        <p>© {new Date().getFullYear()} thereshape · Reshape Clinic</p>
        <p className="flex items-center gap-4">
          <a href="tel:+918608551555" className="font-semibold text-[#22395f] transition-colors hover:text-[#16263f]">
            +91 86085 51555
          </a>
          <a href="/privacy-policy" className="transition-colors hover:text-[#22395f]">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  )
}
