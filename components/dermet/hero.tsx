"use client"

import Image from "next/image"


export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("assessment-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="top"
      onClick={scrollToForm}
      className="relative cursor-pointer overflow-hidden bg-[#fbf8f5]"
    >
      <div className="relative mx-auto w-full max-w-[1912px]">
        <Image
          src="/banner-1.png"
          alt="The Hair Trinity Program — three advanced hair therapies in one doctor-personalised session"
          width={1012}
          height={583}
          priority
          className="hidden h-auto w-full sm:block"
        />
        <Image
          src="/banner-mble.png"
          alt="The Hair Trinity Program — three advanced hair therapies in one doctor-personalised session"
          width={864}
          height={1821}
          priority
          className="h-auto w-full sm:hidden"
        />

      </div>
    </section>
  )
}
