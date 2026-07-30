"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import {
  LuSend,
  LuMessageCircle,
  LuCamera,
  LuX,
  LuPencil,
  LuUpload,
  LuSwitchCamera,
  LuCircle,
  LuStethoscope,
  LuActivity,
} from "react-icons/lu"
import { FaWhatsapp } from "react-icons/fa"
import Reveal from "./Reveal"
import { track } from "./track"

/* Leads are saved to our database and pushed to TeleCRM via this API route. */
const LEAD_ENDPOINT = "/api/leads"
const BRANCH = "Reshape Clinic"
const WHATSAPP_NUMBER = "918608551555"

const BEFORE_AFTER = [
  { src: "https://res.cloudinary.com/n0ccg2u6/image/upload/v1785392873/bf2_kvopn9.png", label: "Before" },
  { src: "https://res.cloudinary.com/n0ccg2u6/image/upload/v1785392872/bf1_t5ienb.png", label: "After" },
]

const REVIEW_USPS = [
  "Private & confidential",
  "Specialist-led review",
  "Personalised guidance",
  "Second-opinion support",
]

type QaKey = "name" | "phone" | "email" | "location" | "symptom" | "surgeryAdvice" | "consultedBefore"

interface QaStep {
  key: QaKey
  label: string
  question: string
  type: "text" | "tel" | "email" | "select"
  placeholder: string
  options?: string[]
  /** defaults to true — set false to let this step be skipped */
  required?: boolean
}

const QA_STEPS: QaStep[] = [
  { key: "name", label: "Name", question: "What's your name?", type: "text", placeholder: "Type your name…" },
  {
    key: "phone",
    label: "Phone number",
    question: "What's your mobile number?",
    type: "tel",
    placeholder: "Type your mobile number…",
  },
  {
    key: "email",
    label: "Email",
    question: "What's your email address?",
    type: "email",
    placeholder: "Type your email…",
    required: false,
  },
  {
    key: "location",
    label: "Location",
    question: "Where are you located?",
    type: "text",
    placeholder: "Type your city / location…",
  },
  {
    key: "symptom",
    label: "Hernia symptom",
    question: "What type of hernia symptom do you have?",
    type: "select",
    placeholder: "Choose a symptom…",
    options: [
      "Abdominal bulge or lump",
      "Groin pain or swelling",
      "Post-pregnancy bulge (diastasis recti)",
      "Post-surgery concern",
      "Not sure — need evaluation",
    ],
  },
  {
    key: "surgeryAdvice",
    label: "Advised surgery before",
    question: "Have you been advised surgery before?",
    type: "select",
    placeholder: "Choose an option…",
    options: ["Yes — I want a second opinion", "No — this is my first consultation", "Currently evaluating options"],
  },
  {
    key: "consultedBefore",
    label: "Consulted another doctor",
    question: "Have you consulted another doctor for this before?",
    type: "select",
    placeholder: "Choose an option…",
    options: [
      "Yes — looking for specialist opinion",
      "No — this is my first consultation",
      "Yes — but reports were inconclusive",
    ],
  },
]

type Stage = "qa" | "review" | "insight" | "final" | "sent"

export default function ChatBooking() {
  const [bfIndex, setBfIndex] = useState(0)

  const [stage, setStage] = useState<Stage>("qa")
  const [qaIndex, setQaIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<QaKey, string>>({
    name: "",
    phone: "",
    email: "",
    location: "",
    symptom: "",
    surgeryAdvice: "",
    consultedBefore: "",
  })

  const [photo, setPhoto] = useState<File | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")

  const [submitting, setSubmitting] = useState(false)
  const [waLink, setWaLink] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const attrRef = useRef<Record<string, string>>({})

  // auto-advance the before/after slideshow
  useEffect(() => {
    const id = setInterval(() => setBfIndex((i) => (i + 1) % BEFORE_AFTER.length), 3000)
    return () => clearInterval(id)
  }, [])

  // release the camera if the component unmounts while it's open
  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), [])

  // release the camera if the user navigates away from the final step while it's open
  useEffect(() => {
    if (stage !== "final") {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
      setCameraOpen(false)
    }
  }, [stage])

  // campaign attribution — captured once from the URL
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const attrs: Record<string, string> = {}
    ;["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"].forEach((k) => {
      attrs[k] = q.get(k) || ""
    })
    attrs.page_url = window.location.href
    attrRef.current = attrs
  }, [])

  const current = QA_STEPS[qaIndex]

  const advanceQa = (rawValue: string) => {
    const value = rawValue.trim()
    if (!value && current.required === false) {
      setAnswers((prev) => ({ ...prev, [current.key]: "" }))
    } else {
      if (!value) return
      if (current.key === "phone" && !/^[6-9][0-9]{9}$/.test(value)) return
      if (current.key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return
      setAnswers((prev) => ({ ...prev, [current.key]: value }))
    }
    if (qaIndex + 1 < QA_STEPS.length) {
      setQaIndex((i) => i + 1)
    } else {
      setStage("review")
    }
  }

  const onPickPhoto = (file: File | null) => {
    if (photoUrl) URL.revokeObjectURL(photoUrl)
    setPhoto(file)
    setPhotoUrl(file ? URL.createObjectURL(file) : null)
  }

  const isMobileDevice = () =>
    typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent)

  const stopCameraStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }

  const startCamera = async (mode: "user" | "environment") => {
    stopCameraStream()
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: mode }, audio: false })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    } catch {
      alert("Couldn't access the camera. Please check permissions, or use Upload instead.")
      setCameraOpen(false)
    }
  }

  const openCamera = () => {
    // phones default to the back camera (better for photographing the affected area) but can flip;
    // desktops only have a front-facing webcam, so start there directly
    const mode = isMobileDevice() ? "environment" : "user"
    setFacingMode(mode)
    setCameraOpen(true)
    startCamera(mode)
  }

  const flipCamera = () => {
    const next = facingMode === "environment" ? "user" : "environment"
    setFacingMode(next)
    startCamera(next)
  }

  const closeCamera = () => {
    stopCameraStream()
    setCameraOpen(false)
  }

  const capturePhoto = () => {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    canvas.toBlob(
      (blob) => {
        if (!blob) return
        onPickPhoto(new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" }))
        closeCamera()
      },
      "image/jpeg",
      0.9,
    )
  }

  const handleWhatsApp = async () => {
    const name = answers.name.trim()
    const phone = answers.phone.trim()
    if (!name || !/^[6-9][0-9]{9}$/.test(phone)) {
      alert("Please go back and fill in your name and mobile number.")
      setStage("review")
      return
    }

    setSubmitting(true)
    const attrs = attrRef.current
    const payload = {
      name,
      phone,
      area: answers.symptom,
      duration: answers.surgeryAdvice,
      branch: BRANCH,
      source: attrs.utm_source || "direct",
      medium: attrs.utm_medium || "",
      campaign: attrs.utm_campaign || "",
      pageUrl: attrs.page_url || (typeof window !== "undefined" ? window.location.href : ""),
    }

    // best-effort — still continue to WhatsApp even if the CRM sync fails
    try {
      await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } catch {
      /* ignore — WhatsApp handoff below is the primary path */
    }

    track("whatsapp_click", { branch: BRANCH, concern: answers.symptom, source: "chat_booking" })

    const message = [
      "Hi, I'd like to book a hernia consultation.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      answers.email ? `Email: ${answers.email}` : null,
      answers.location ? `Location: ${answers.location}` : null,
      `Hernia symptom: ${answers.symptom}`,
      `Advised surgery before: ${answers.surgeryAdvice}`,
      `Consulted another doctor: ${answers.consultedBefore}`,
      photo ? "(I have a photo to share — attaching it here.)" : null,
    ]
      .filter(Boolean)
      .join("\n")

    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    setWaLink(link)
    setSubmitting(false)
    setStage("sent")
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="book" className="border-b border-[#e7ecf3] bg-[#fbf8f5] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <div className="mx-auto mb-9 max-w-[720px] text-center sm:mb-11">
          <p className="kicker justify-center">
            Private Hernia Consultation
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)]">
            Tell Us About Your Hernia Concern
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[0.95rem] leading-relaxed text-[#5f6f88] sm:text-[1rem]">
            Share a few details about your symptoms and connect privately with our specialist team.
          </p>
        </div>

        <Reveal className="grid grid-cols-1 gap-5 md:grid-cols-[1.2fr_1fr] md:items-stretch">
          {/* LEFT — chatbot-style assessment */}
          <div className="flex flex-col overflow-hidden rounded-[26px] border border-[#e7ecf3] bg-white">
            {/* chat header */}
            <div className="flex flex-none items-center gap-3 bg-[#22395f] px-6 py-5">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white/10 text-[#fccbb6]">
                <LuMessageCircle className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-[0.95rem] font-bold text-white">Reshape Assistant</div>
                <div className="flex items-center gap-1.5 text-[0.72rem] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7a0]" />
                  Typically replies instantly
                </div>
              </div>
            </div>

            {/* one screen at a time — the next question replaces the last, right in this same spot */}
            <div className="flex-1 px-6 py-6">
              {/* Intro belongs to the question flow; later stages show only their relevant content. */}
              {stage === "qa" && (
                <div className="mb-4 space-y-3">
                  <BotBubble>
                    <span className="font-bold text-[#22395f]">Let&apos;s Understand Your Concern</span>
                  </BotBubble>
                  <BotBubble>
                    Tell us what you&apos;ve noticed and whether you&apos;ve already received medical advice.
                  </BotBubble>
                  <BotBubble>Your answers will help our hernia specialist prepare for your consultation 👇</BotBubble>
                </div>
              )}

              {stage === "qa" && (
                <div key={qaIndex} className="rise space-y-5">
                  <div className="flex items-center gap-1.5">
                    {QA_STEPS.map((s, i) => (
                      <span
                        key={s.key}
                        className={`h-0.5 flex-1 rounded-full ${i <= qaIndex ? "bg-[#22395f]" : "bg-[#e7ecf3]"}`}
                      />
                    ))}
                  </div>

                  <BotBubble>{current.question}</BotBubble>

                  <div className="pt-2">
                    {current.type === "select" ? (
                      <select
                        key={current.key}
                        autoFocus
                        defaultValue={answers[current.key] || ""}
                        onChange={(e) => advanceQa(e.target.value)}
                        className={chatTyperCls}
                      >
                        <option value="" disabled>
                          {current.placeholder}
                        </option>
                        {current.options?.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="flex items-center gap-3">
                        <input
                          key={current.key}
                          ref={textInputRef}
                          autoFocus
                          type={current.type}
                          inputMode={current.type === "tel" ? "numeric" : undefined}
                          defaultValue={answers[current.key] || ""}
                          placeholder={current.placeholder}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") advanceQa(textInputRef.current?.value ?? "")
                          }}
                          className={chatTyperCls}
                        />
                        <button
                          type="button"
                          onClick={() => advanceQa(textInputRef.current?.value ?? "")}
                          aria-label="Next"
                          className="btn-wave flex h-[50px] w-[50px] flex-none items-center justify-center rounded-full bg-[#22395f] text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#16263f]"
                        >
                          <LuSend className="relative z-10 h-4 w-4" />
                        </button>
                      </div>
                    )}

                    {current.required === false && (
                      <button
                        type="button"
                        onClick={() => advanceQa("")}
                        className="mt-3 text-[0.78rem] font-semibold text-[#5f6f88] underline underline-offset-2"
                      >
                        Skip for now
                      </button>
                    )}
                  </div>
                </div>
              )}

              {stage === "review" && (
                <div className="rise space-y-4">
                  <BotBubble>Please confirm that your contact and hernia details are correct.</BotBubble>

                  <div className="grid grid-cols-2 gap-3">
                    {QA_STEPS.map((s, i) => (
                      <div
                        key={s.key}
                        className="flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-[#e7ecf3] bg-[#fbf8f5] px-3 py-3"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-[0.62rem] font-bold uppercase tracking-[0.06em] text-[#5f6f88]">
                            {s.label}
                          </div>
                          <div className="truncate text-[0.84rem] font-semibold text-[#1f2f47]">
                            {answers[s.key] || "—"}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setQaIndex(i)
                            setStage("qa")
                          }}
                          aria-label={`Edit ${s.label}`}
                          className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] transition-colors hover:bg-[#fef5ef]"
                        >
                          <LuPencil className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setQaIndex(QA_STEPS.length - 1)
                        setStage("qa")
                      }}
                      className="flex-none rounded-full border border-[#e7ecf3] bg-white px-5 py-3.5 text-[0.9rem] font-semibold text-[#22395f] transition-colors hover:bg-[#fef5ef]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStage("insight")}
                      className="btn-wave group/btn flex flex-1 items-center justify-center gap-2 rounded-full bg-[#22395f] px-6 py-3.5 text-[0.9rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#16263f]"
                    >
                      <span className="relative z-10">Continue</span>
                    </button>
                  </div>
                </div>
              )}

              {stage === "insight" && (
                <div className="rise space-y-5">
                  <div className="flex items-center gap-2 text-[0.9rem] font-semibold text-[#3a5f8a]">
                    <LuStethoscope className="h-5 w-5" />
                    Your preliminary care guidance
                  </div>

                  <div className="rounded-2xl bg-[#fef5ef] px-5 py-5 text-[1.08rem] font-bold leading-snug text-[#d96f00]">
                    A specialist consultation is recommended
                  </div>

                  <div className="text-[0.9rem] font-bold text-[#22395f]">Based on your answers</div>

                  <div className="flex gap-3 rounded-2xl border border-[#a8c8ff] bg-[#f0f6ff] px-4 py-4 text-[0.88rem] leading-relaxed text-[#1f2f47]">
                    <LuActivity className="mt-0.5 h-5 w-5 flex-none text-[#3485f5]" />
                    <p>
                      A clinical examination can help identify the type of hernia and whether monitoring, treatment or
                      a surgical opinion is the most suitable next step.
                    </p>
                  </div>

                  <p className="rounded-2xl bg-[#eef2f6] px-4 py-3 text-[0.78rem] leading-relaxed text-[#5f6f88]">
                    This guidance is not a diagnosis. Your specialist will assess your symptoms and medical history.
                  </p>

                  <div className="w-full min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
                    <div className="marquee gap-3">
                      {[...REVIEW_USPS, ...REVIEW_USPS].map((item, index) => (
                        <span
                          key={`${item}-${index}`}
                          aria-hidden={index >= REVIEW_USPS.length}
                          className="inline-flex flex-none items-center gap-2 whitespace-nowrap rounded-full border border-[#e7ecf3] bg-[#fbf8f5] px-4 py-2 text-[0.78rem] font-semibold text-[#22395f]"
                        >
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#fccbb6] text-[0.62rem]">
                            ✓
                          </span>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStage("review")}
                      className="flex-none rounded-full border border-[#e7ecf3] bg-white px-5 py-3.5 text-[0.9rem] font-semibold text-[#22395f] transition-colors hover:bg-[#fef5ef]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStage("final")}
                      className="btn-wave group/btn flex flex-1 items-center justify-center rounded-full bg-[#22395f] px-6 py-3.5 text-[0.9rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#16263f]"
                    >
                      <span className="relative z-10">Continue</span>
                    </button>
                  </div>
                </div>
              )}

              {stage === "final" && (
                <div className="rise space-y-4">
                  <BotBubble>
                    Almost done! If the bulge or swelling is visible, you may add a photo before continuing to WhatsApp.
                  </BotBubble>

                  {/* photo upload / camera capture */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onPickPhoto(e.target.files?.[0] || null)}
                    className="hidden"
                  />

                  {cameraOpen ? (
                    <div className="space-y-3">
                      <div className="relative overflow-hidden rounded-2xl bg-black">
                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        <video ref={videoRef} playsInline muted className="aspect-[4/3] w-full object-cover" />
                      </div>
                      <div className="flex items-center justify-center gap-5">
                        <button
                          type="button"
                          onClick={closeCamera}
                          aria-label="Cancel"
                          className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#5f6f88] transition-colors hover:bg-[#fef5ef]"
                        >
                          <LuX className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={capturePhoto}
                          aria-label="Capture photo"
                          className="btn-wave flex h-16 w-16 flex-none items-center justify-center rounded-full border-4 border-[#e7ecf3] bg-[#22395f] text-white transition-transform hover:scale-105"
                        >
                          <LuCircle className="relative z-10 h-6 w-6" />
                        </button>
                        <button
                          type="button"
                          onClick={flipCamera}
                          aria-label="Switch camera"
                          className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[#e7ecf3] bg-white text-[#22395f] transition-colors hover:bg-[#fef5ef]"
                        >
                          <LuSwitchCamera className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : photoUrl ? (
                    <div className="relative flex items-center gap-3 rounded-2xl border border-[#e7ecf3] bg-[#fbf8f5] p-2.5">
                      <div className="relative h-14 w-14 flex-none overflow-hidden rounded-xl">
                        <Image src={photoUrl} alt="Selected photo" fill className="object-cover" unoptimized />
                      </div>
                      <div className="min-w-0 flex-1 truncate text-[0.85rem] text-[#1f2f47]">{photo?.name}</div>
                      <button
                        type="button"
                        onClick={() => onPickPhoto(null)}
                        aria-label="Remove photo"
                        className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-[#5f6f88] transition-colors hover:bg-[#fef5ef] hover:text-[#22395f]"
                      >
                        <LuX className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#c9d3e2] bg-[#fbf8f5] px-4 py-4 text-[0.85rem] font-semibold text-[#22395f] transition-colors hover:bg-[#fef5ef]"
                      >
                        <LuUpload className="h-4 w-4" />
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={openCamera}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#c9d3e2] bg-[#fbf8f5] px-4 py-4 text-[0.85rem] font-semibold text-[#22395f] transition-colors hover:bg-[#fef5ef]"
                      >
                        <LuCamera className="h-4 w-4" />
                        Take Photo
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="space-y-1.5">
                      <span className="pl-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#5f6f88]">
                        Name
                      </span>
                      <input
                        type="text"
                        value={answers.name}
                        readOnly
                        className={`${chatInputCls} bg-[#fbf8f5]`}
                      />
                    </label>

                    <label className="space-y-1.5">
                      <span className="pl-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#5f6f88]">
                        Phone number
                      </span>
                      <input
                        type="tel"
                        value={answers.phone}
                        readOnly
                        className={`${chatInputCls} bg-[#fbf8f5]`}
                      />
                    </label>

                    <label className="space-y-1.5 sm:col-span-2">
                      <span className="pl-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#5f6f88]">
                        Email
                      </span>
                      <input
                        type="email"
                        value={answers.email}
                        readOnly
                        placeholder="Not provided"
                        className={`${chatInputCls} bg-[#fbf8f5]`}
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[0.9rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1fb959] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                    {submitting ? "Please wait…" : "Continue with WhatsApp"}
                  </button>
                  <p className="text-center text-[0.75rem] leading-relaxed text-[#5f6f88]">
                    By continuing, you agree to be contacted by thereshape about your appointment.
                  </p>
                </div>
              )}

              {stage === "sent" && (
                <div className="rise px-2 py-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#e7fbef] text-[#25D366]">
                    <FaWhatsapp className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 text-[1.05rem] text-[#22395f]">Opening WhatsApp…</h3>
                  <p className="mb-4 text-[0.88rem] text-[#5f6f88]">
                    If a new tab didn&apos;t open, tap the button below to continue the conversation.
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-[0.88rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1fb959]"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    Open WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — before / after slideshow, one image at a time (reusing the clinic's existing before/after photos) */}
          <div className="relative h-56 overflow-hidden rounded-[26px] border border-[#e7ecf3] md:h-full">
            <div
              className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${bfIndex * 100}%)` }}
            >
              {BEFORE_AFTER.map((b) => (
                <div key={b.label} className="relative h-full w-full shrink-0 grow-0">
                  <Image src={b.src} alt={b.label} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#22395f]/85 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>

            {/* dots */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {BEFORE_AFTER.map((b, i) => (
                <span
                  key={b.label}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === bfIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const chatInputCls =
  "w-full rounded-2xl border border-[#e7ecf3] bg-white px-4 py-3 text-[0.92rem] text-[#1f2f47] transition-all duration-150 focus:border-[#22395f] focus:outline-none focus:ring-2 focus:ring-[#fccbb6]"

/* the active "typer" field for the current chat question — pill-shaped to match the round send button */
const chatTyperCls =
  "w-full rounded-full border border-[#e7ecf3] bg-white px-5 py-3.5 text-[0.95rem] text-[#1f2f47] transition-all duration-150 focus:border-[#22395f] focus:outline-none focus:ring-2 focus:ring-[#fccbb6]"

function BotBubble({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-[#fef5ef] px-4 py-3 text-[0.88rem] leading-relaxed text-[#3a4f6f]">
      {children}
    </div>
  )
}
