"use client"

import { useEffect } from "react"
import { LuArrowRight } from "react-icons/lu"
import { FaAward, FaUserMd, FaUsers } from "react-icons/fa"
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2"
import useEmblaCarousel from "embla-carousel-react"
import Reveal from "./Reveal"
import CountUp from "./CountUp"

const EXPERTISE = [
  "Hair Trinity Program",
  "Hair Fall & Hair Thinning Treatment",
  "Scalp Analysis & Hair Growth Planning",
  "PRP & Regenerative Hair Therapies",
  "Non-Surgical Hair Restoration",
  "Personalized Hair Care Solutions",
]

const DOCTOR_SLIDES = [
  {
    id: "aneesha",
    name: "Dr. Aneesha M",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/docaneesha_rik4bt.png",
    role: "Aesthetic Physician",
    credentials: "B.D.S., F.D.S., F.M.C.",
    experience: "5+ Years of Experience in Aesthetic & Hair Care",
    experienceYears: 5,
    secondBadgeValue: "20,000+",
    secondBadgeLabel: "Happy Patients",
    bio: [
      "With over 5 years of clinical experience, Dr. Aneesha M specializes in advanced hair restoration and aesthetic treatments. She focuses on delivering personalized, evidence based solutions to help patients reduce hair fall, improve hair density, and achieve natural looking results.",
      "Using advanced diagnostic techniques and customized treatment plans, she ensures every patient receives safe, effective, and scientifically guided care tailored to their unique hair concerns.",
    ],
    expertise: EXPERTISE,
  },
  {
    id: "ashik",
    name: "Dr. Ashik Ahamed",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/v1785406558/ecaf6fcc-9eb0-47d9-bf1a-e70960718af8_nxanjn.png",
    role: "Plastic Surgeon",
    credentials: "M.B.B.S., M.S. – General Surgery, M.Ch. – Plastic & Reconstructive Surgery",
    experience: "17+ Years of Experience in Plastic & Reconstructive Surgery",
    experienceYears: 17,
    secondBadgeValue: "Specialist",
    secondBadgeLabel: "Plastic Surgeon",
    bio: [
      "With over 17 years of experience, Dr. Ashik Ahamed specializes in plastic, reconstructive, and aesthetic surgical procedures. His approach combines detailed clinical assessment with personalized surgical planning to achieve functional and aesthetically balanced outcomes.",
      "He focuses on providing safe, patient-centered care, guiding patients from initial consultation and treatment planning through procedure and post-treatment recovery.",
    ],
    expertise: ["Plastic Surgery", "Reconstructive Surgery", "Aesthetic Surgery", "Body Contouring"],
  },
  {
    id: "revathi",
    name: "Dr. Revathi R",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/v1785406541/f5720d4e-fb7f-48ac-aca8-ee2b2093bb99_na7cgf.jpg",
    role: "Dermatologist",
    credentials: "",
    experience: "Expert Care in Dermatology, Skin & Aesthetic Treatments",
    experienceYears: null,
    firstBadgeValue: "Expert Care",
    firstBadgeLabel: "Dermatology",
    secondBadgeValue: "Specialist",
    secondBadgeLabel: "Dermatologist",
    bio: [
      "Dr. Revathi R is a dermatologist focused on the diagnosis and management of a wide range of skin, hair, and aesthetic concerns. Her approach emphasizes careful clinical evaluation, personalized treatment planning, and appropriate dermatological care based on each patient's individual needs.",
      "She guides patients through their treatment journey with a focus on skin health, informed care, and natural-looking aesthetic outcomes.",
    ],
    expertise: ["Dermatology", "Skin Care", "Hair & Scalp Concerns", "Aesthetic Dermatology", "Skin Rejuvenation"],
  },
  {
    id: "rukkayal",
    name: "Dr. Rukkayal Fathima",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/v1785406561/2417e745-33a0-49ec-b724-73941dc1e84a_pkfmyf.png",
    role: "Aesthetic Gynaecologist",
    credentials: "M.B.B.S., M.S., MRC.OG, F ART, FRM, F MAS",
    experience: "10+ Years of Experience in Gynaecology & Aesthetic Gynaecology",
    experienceYears: 10,
    secondBadgeValue: "Specialist",
    secondBadgeLabel: "Aesthetic Gynaecologist",
    bio: [
      "With over 10 years of experience, Dr. Rukkayal Fathima specializes in gynaecology, fertility care, and aesthetic gynaecology. She provides personalized evaluation and treatment with an emphasis on patient privacy, comfort, and individual needs.",
      "Her approach combines clinical experience with modern treatment options, ensuring patients receive clear guidance and appropriate care throughout their treatment journey.",
    ],
    expertise: ["Aesthetic Gynaecology", "Gynaecology", "Fertility Care", "Women's Intimate Health"],
  },
]

export default function Doctor() {
  const [carouselRef, carouselApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (!carouselApi) return

    const autoplay = window.setInterval(() => {
      carouselApi.scrollNext()
    }, 5000)

    return () => window.clearInterval(autoplay)
  }, [carouselApi])

  return (
    <section id="doctor" className="border-b border-[#e7ecf3] bg-white py-14 sm:py-16 lg:py-20 max-[470px]:py-6">
      <div className="relative mx-auto w-full max-w-[1320px]">
        <div ref={carouselRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {DOCTOR_SLIDES.map((doctor) => (
            <div key={doctor.id} className="min-w-0 flex-[0_0_100%]">
              <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-10 px-5 sm:px-8 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-16 lg:gap-y-0">
        {/* details — name + credentials (mobile: above the image) */}
        <Reveal className="min-w-0 lg:col-start-2 lg:row-start-1 lg:self-end">
          <p className="kicker">Meet Our Specialist</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)]">{doctor.name}</h2>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem] font-semibold text-[#22395f]">
            <span>{doctor.role}</span>
            {doctor.credentials && (
              <>
                <span className="text-[#fccbb6]">•</span>
                <span className="text-[#5f6f88]">{doctor.credentials}</span>
              </>
            )}
          </div>
          <p className="mt-1 text-[0.9rem] font-medium text-[#5f6f88]">
            {doctor.experience}
          </p>
        </Reveal>

        {/* portrait seated on a soft grey blob with floating badges. */}
        <Reveal index={1} className="relative mx-auto w-full max-w-[440px] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="relative aspect-square">
            {/* dotted texture behind the blob */}
            <div
              className="absolute right-1 top-2 h-28 w-28"
              aria-hidden="true"
              style={{
                backgroundImage: "radial-gradient(rgba(34,57,95,0.16) 1.4px, transparent 1.4px)",
                backgroundSize: "13px 13px",
              }}
            />
            <div
              className="absolute bottom-6 left-0 h-24 w-24"
              aria-hidden="true"
              style={{
                backgroundImage: "radial-gradient(rgba(34,57,95,0.14) 1.4px, transparent 1.4px)",
                backgroundSize: "13px 13px",
              }}
            />

            {/* grey blob holding the portrait — clipped to the circle so the
                image never overflows the round. Replace src with a real photo. */}
            <div className="absolute inset-[4%] overflow-hidden rounded-full bg-[#e8e9ee]">
              <img
                src={doctor.image}
                alt={`${doctor.name}, ${doctor.role}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              {/* fade the base into the blob */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-[#e8e9ee] to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* badge — experience (top-left) */}
            <div className="float absolute -left-2 top-[8%] z-20 flex items-center gap-3 rounded-[20px] bg-white px-4 py-3 shadow-[0_20px_45px_-18px_rgba(34,57,95,0.45)]">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#fef5ef] text-[#22395f]">
                <FaAward className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="display text-[1.05rem] font-bold text-[#22395f]">
                  {doctor.experienceYears ? (
                    <CountUp end={doctor.experienceYears} suffix="+ Years" />
                  ) : (
                    doctor.firstBadgeValue
                  )}
                </div>
                <div className="text-[0.72rem] font-semibold text-[#5f6f88]">
                  {doctor.experienceYears ? "Experience" : doctor.firstBadgeLabel}
                </div>
              </div>
            </div>

            {/* badge — happy patients (bottom-centre) */}
            <div
              className="float absolute -bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-[20px] bg-white px-4 py-3 shadow-[0_20px_45px_-18px_rgba(34,57,95,0.45)]"
              style={{ animationDelay: "1.2s" }}
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#fef5ef] text-[#22395f]">
                {doctor.id === "aneesha" ? <FaUsers className="h-5 w-5" /> : <FaUserMd className="h-5 w-5" />}
              </span>
              <div className="leading-tight">
                <div className="display text-[1.05rem] font-bold text-[#22395f]">
                  {doctor.id === "aneesha" ? <CountUp end={20000} separator="," suffix="+" /> : doctor.secondBadgeValue}
                </div>
                <div className="text-[0.72rem] font-semibold text-[#5f6f88]">{doctor.secondBadgeLabel}</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* bio, expertise, CTA (mobile: below the image) */}
        <Reveal index={2} className="min-w-0 lg:col-start-2 lg:row-start-2 lg:mt-6 lg:self-start">
          <p className="max-w-[62ch] text-[1.02rem] leading-relaxed text-[#5f6f88]">
            {doctor.bio[0]}
          </p>
          <p className="mt-4 max-w-[62ch] text-[1.02rem] leading-relaxed text-[#5f6f88]">
            {doctor.bio[1]}
          </p>

          {/* expertise — seamless auto-scrolling marquee within this column */}
          <div className="mt-7 w-full min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
            <div className="marquee gap-3">
              {[...doctor.expertise, ...doctor.expertise].map((e, i) => (
                <span
                  key={i}
                  aria-hidden={i >= doctor.expertise.length}
                  className="inline-flex flex-none items-center gap-2 whitespace-nowrap rounded-full border border-[#e7ecf3] bg-white px-4 py-2 text-[0.9rem] font-medium text-[#1f2f47]"
                >
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#fccbb6] text-[0.7rem] font-bold text-[#22395f]">
                    ✓
                  </span>
                  {e}
                </span>
              ))}
            </div>
          </div>

          <a href="#book" className="btn btn-primary btn-wave group/btn mt-9">
            <span className="relative z-10 inline-flex items-center gap-2">
              Book Your Consultation
              <LuArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </span>
          </a>
        </Reveal>
              </div>
            </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => carouselApi?.scrollPrev()}
          aria-label="View previous doctor"
          className="group absolute left-2 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] shadow-[0_12px_30px_-12px_rgba(34,57,95,0.35)] transition-all duration-200 hover:border-[#fccbb6] hover:bg-[#22395f] hover:text-white md:flex xl:left-0"
        >
          <HiOutlineChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={() => carouselApi?.scrollNext()}
          aria-label="View next doctor"
          className="group absolute right-2 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] shadow-[0_12px_30px_-12px_rgba(34,57,95,0.35)] transition-all duration-200 hover:border-[#fccbb6] hover:bg-[#22395f] hover:text-white md:flex xl:right-0"
        >
          <HiOutlineChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>

        <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => carouselApi?.scrollPrev()}
            aria-label="View previous doctor"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] shadow-[0_10px_25px_-12px_rgba(34,57,95,0.35)] transition-colors hover:border-[#fccbb6] hover:bg-[#22395f] hover:text-white"
          >
            <HiOutlineChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => carouselApi?.scrollNext()}
            aria-label="View next doctor"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] shadow-[0_10px_25px_-12px_rgba(34,57,95,0.35)] transition-colors hover:border-[#fccbb6] hover:bg-[#22395f] hover:text-white"
          >
            <HiOutlineChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
