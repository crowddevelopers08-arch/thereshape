"use client"

import { track } from "./track"

export default function StickyCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] flex gap-2.5 border-t border-[#e7ecf3] bg-white/95 px-3.5 pt-2.5 backdrop-blur-[10px] lg:hidden"
      style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
    >
      <a
        href="tel:+918608551555"
        onClick={() => track("call_click", { branch: "Reshape Clinic" })}
        className="btn btn-ghost flex-1 px-3 py-3 text-[0.9rem]"
      >
        Call now
      </a>
      <a
        href="#book"
        onClick={() => track("book_click", { branch: "Reshape Clinic" })}
        className="btn btn-primary flex-1 px-3 py-3 text-[0.9rem]"
      >
        Book now
      </a>
    </div>
  )
}
