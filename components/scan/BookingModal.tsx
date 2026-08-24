"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
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
  LuLock,
  LuCircleAlert,
} from "react-icons/lu"
import { FaWhatsapp } from "react-icons/fa"
import { OPEN_BOOKING_EVENT } from "./booking-bus"
import { track } from "./track"

/* Leads are saved to our database and pushed to TeleCRM via this API route. */
const LEAD_ENDPOINT = "/api/leads"
const BRANCH = "Reshape Clinic"
const WHATSAPP_NUMBER = "918608551555"

const REVIEW_USPS = [
  "Private & confidential",
  "Specialist-led review",
  "Personalised guidance",
  "Second-opinion support",
]

type QaKey =
  | "name"
  | "phone"
  | "email"
  | "location"
  | "primaryConcern"
  | "hairLossDuration"
  | "hairLossArea"
  | "familyHistory"

interface QaStep {
  key: QaKey
  label: string
  question: string
  type: "text" | "tel" | "email" | "options"
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
  },
  {
    key: "location",
    label: "Location",
    question: "Where are you located?",
    type: "text",
    placeholder: "Type your city / location…",
  },
  {
    key: "primaryConcern",
    label: "Primary hair concern",
    question: "What is your primary hair concern?",
    type: "options",
    placeholder: "Choose your primary concern",
    options: [
      "Hair fall",
      "Hair thinning",
      "Receding hairline",
      "Bald patches",
      "Excessive hair shedding",
      "Slow hair growth",
    ],
  },
  {
    key: "hairLossDuration",
    label: "Hair loss duration",
    question: "How long have you been experiencing hair loss?",
    type: "options",
    placeholder: "Choose a duration",
    options: ["Less than 3 months", "3–6 months", "6–12 months", "More than 1 year"],
  },
  {
    key: "hairLossArea",
    label: "Most noticeable area",
    question: "Where is your hair loss most noticeable?",
    type: "options",
    placeholder: "Choose an area",
    options: ["Front hairline", "Crown area", "Entire scalp", "Side temples", "Beard/Eyebrows"],
  },
  {
    key: "familyHistory",
    label: "Family history",
    question: "Do you have a family history of hair loss?",
    type: "options",
    placeholder: "Choose an option",
    options: ["Yes", "No", "Not sure"],
  },
]

/* ── Validation ────────────────────────────────────────────────────────────
   Indian mobiles are 10 digits opening with 6–9. The email test is deliberately
   loose — it rejects obvious typos without turning away unusual but valid
   addresses, which a stricter pattern would. */
const PHONE_RE = /^[6-9][0-9]{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Returns a message explaining why an answer is unacceptable, or "" if it's fine. */
function validateAnswer(step: QaStep, rawValue: string): string {
  const value = rawValue.trim()

  if (!value) {
    if (step.required === false) return ""
    return step.type === "options"
      ? "Please choose an option to continue."
      : `Please enter your ${step.label.toLowerCase()}.`
  }
  if (step.key === "phone" && !PHONE_RE.test(value)) {
    return "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9."
  }
  if (step.key === "email" && !EMAIL_RE.test(value)) {
    return "Enter a valid email address, like you@example.com."
  }
  return ""
}

const EMPTY_ANSWERS: Record<QaKey, string> = {
  name: "",
  phone: "",
  email: "",
  location: "",
  primaryConcern: "",
  hairLossDuration: "",
  hairLossArea: "",
  familyHistory: "",
}

type Stage = "qa" | "review" | "insight" | "final" | "sent"

/**
 * The hair-scan assessment, delivered as a popup instead of an inline section.
 *
 * It opens on the hero's "Start Your Assessment" button (via the `scan:open-booking`
 * event) and on any `<a href="#book">` CTA on the page — header, sticky bar,
 * doctor section — so every call to action lands in the same flow. It never
 * opens on its own.
 */
export default function BookingModal() {
  const [open, setOpen] = useState(false)

  const [stage, setStage] = useState<Stage>("qa")
  const [qaIndex, setQaIndex] = useState(0)
  const [editingReview, setEditingReview] = useState(false)
  const [answers, setAnswers] = useState<Record<QaKey, string>>(EMPTY_ANSWERS)

  const [photo, setPhoto] = useState<File | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")

  const [submitting, setSubmitting] = useState(false)
  const [waLink, setWaLink] = useState("")
  /** Validation message for the step on screen; cleared on every stage/step move. */
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const attrRef = useRef<Record<string, string>>({})
  // synchronous re-entrancy guard — `submitting` state only blocks the button after
  // the next render, so a second click/Enter fired in that gap would still get through
  const sendingRef = useRef(false)

  /* ---------------------------------------------------------------- */
  /*  Opening / closing                                                */
  /* ---------------------------------------------------------------- */

  // the hero button dispatches this; any "#book" CTA is intercepted below
  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_BOOKING_EVENT, onOpen)

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href="#book"]')
      if (link) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("click", onClick)

    return () => {
      window.removeEventListener(OPEN_BOOKING_EVENT, onOpen)
      document.removeEventListener("click", onClick)
    }
  }, [])

  // esc to close + lock background scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  /* ---------------------------------------------------------------- */
  /*  Assessment flow                                                  */
  /* ---------------------------------------------------------------- */

  // release the camera if the component unmounts while it's open
  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), [])

  // release the camera whenever we leave the photo step or close the popup
  useEffect(() => {
    if (stage !== "final" || !open) {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
      setCameraOpen(false)
    }
  }, [stage, open])

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

  const resetFlow = useCallback(() => {
    sendingRef.current = false
    setPhotoUrl((url) => {
      if (url) URL.revokeObjectURL(url)
      return null
    })
    setStage("qa")
    setQaIndex(0)
    setEditingReview(false)
    setAnswers(EMPTY_ANSWERS)
    setPhoto(null)
    setWaLink("")
    setError("")
  }, [])

  // 15s after WhatsApp opens, close and blank the form so it's ready for the next visitor
  useEffect(() => {
    if (stage !== "sent") return
    const id = setTimeout(() => {
      setOpen(false)
      resetFlow()
    }, 15000)
    return () => clearTimeout(id)
  }, [stage, resetFlow])

  const advanceQa = (rawValue: string) => {
    const value = rawValue.trim()

    const message = validateAnswer(current, value)
    if (message) {
      setError(message)
      return
    }
    setError("")
    setAnswers((prev) => ({ ...prev, [current.key]: value }))

    if (editingReview) {
      setEditingReview(false)
      setStage("review")
      return
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
    if (file) setError("")
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

  const preparePhoto = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const image = document.createElement("img")
      const objectUrl = URL.createObjectURL(file)
      image.onload = () => {
        const maxSide = 1200
        const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight))
        const canvas = document.createElement("canvas")
        canvas.width = Math.round(image.naturalWidth * scale)
        canvas.height = Math.round(image.naturalHeight * scale)
        const context = canvas.getContext("2d")
        if (!context) {
          URL.revokeObjectURL(objectUrl)
          reject(new Error("Could not process image"))
          return
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        URL.revokeObjectURL(objectUrl)
        resolve(canvas.toDataURL("image/jpeg", 0.72))
      }
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl)
        reject(new Error("Could not read image"))
      }
      image.src = objectUrl
    })

  const handleWhatsApp = async () => {
    if (sendingRef.current) return
    sendingRef.current = true

    const name = answers.name.trim()
    const phone = answers.phone.trim()

    // Re-check every answer at the point of submission — the visitor can edit any
    // step from the review screen, so an earlier pass is not proof it is still valid.
    const invalidIndex = QA_STEPS.findIndex((step) => validateAnswer(step, answers[step.key]))
    if (invalidIndex !== -1) {
      sendingRef.current = false
      const step = QA_STEPS[invalidIndex]
      setQaIndex(invalidIndex)
      setStage("qa")
      setError(validateAnswer(step, answers[step.key]))
      return
    }
    if (!photo) {
      sendingRef.current = false
      setError("Please add a clear photo of the affected hair or scalp area to continue.")
      return
    }
    setError("")

    setSubmitting(true)
    const attrs = attrRef.current
    let photoData: string | undefined
    try {
      photoData = await preparePhoto(photo)
    } catch {
      sendingRef.current = false
      setSubmitting(false)
      setError("We couldn't process that photo. Please choose another image and try again.")
      return
    }

    const payload = {
      name,
      phone,
      email: answers.email.trim(),
      location: answers.location,
      area: answers.primaryConcern,
      duration: answers.hairLossDuration,
      hairLossArea: answers.hairLossArea,
      familyHistory: answers.familyHistory,
      photoData,
      branch: BRANCH,
      source: attrs.utm_source || "direct",
      medium: attrs.utm_medium || "",
      campaign: attrs.utm_campaign || "",
      pageUrl: attrs.page_url || (typeof window !== "undefined" ? window.location.href : ""),
      formSource: "Scan-Popup",
    }

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error("Lead submission failed")
    } catch {
      sendingRef.current = false
      setSubmitting(false)
      setError("We couldn't save your details. Please try again before continuing to WhatsApp.")
      return
    }

    track("whatsapp_click", { branch: BRANCH, concern: answers.primaryConcern, source: "scan_popup" })

    const message = [
      "Hi, I'd like to book a hair consultation.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Location: ${answers.location}`,
      `Primary hair concern: ${answers.primaryConcern}`,
      `Hair loss duration: ${answers.hairLossDuration}`,
    ]
      .filter(Boolean)
      .join("\n")

    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    setWaLink(link)
    setSubmitting(false)
    setStage("sent")
    window.open(link, "_blank", "noopener,noreferrer")
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  const stepNumber = stage === "qa" ? qaIndex + 1 : QA_STEPS.length
  const progress = stage === "qa" ? (qaIndex / QA_STEPS.length) * 100 : stage === "sent" ? 100 : 92

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="reshape fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-[#16263f]/75 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Hair scan assessment"
            className="relative z-10 flex max-h-[94vh] w-full max-w-[580px] flex-col overflow-hidden rounded-t-[26px] bg-white shadow-[0_50px_110px_-40px_rgba(0,0,0,0.7)] sm:max-h-[92vh] sm:rounded-[26px]"
            initial={{ opacity: 0, scale: 0.96, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 14 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── header ─────────────────────────────────────────── */}
            <div className="relative flex-none bg-gradient-to-br from-[#22395f] via-[#22395f] to-[#16263f] px-5 pb-5 pt-5 sm:px-6">
              <div className="flex items-center gap-3 pr-10">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white/10 text-[#fccbb6]">
                  <LuMessageCircle className="h-5 w-5" />
                </span>
                <div className="min-w-0 leading-tight">
                  <div className="text-[0.98rem] font-bold text-white">Reshape Assistant</div>
                  <div className="flex items-center gap-1.5 text-[0.72rem] text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7a0]" />
                    Typically replies instantly
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <LuX className="h-5 w-5" />
              </button>

              {/* progress rail */}
              <div className="mt-5 flex items-center gap-3">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#fccbb6] to-[#fde0d0] transition-[width] duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="flex-none text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white/55">
                  {stage === "qa" ? `Step ${stepNumber}/${QA_STEPS.length}` : stage === "sent" ? "Done" : "Almost there"}
                </span>
              </div>
            </div>

            {/* ── body ───────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              {stage === "qa" && (
                <div className="mb-4 space-y-3">
                  <BotBubble>
                    <span className="font-bold text-[#22395f]">Let&apos;s understand your concern</span>
                  </BotBubble>
                  <BotBubble>Your answers help our hair specialist prepare for your consultation 👇</BotBubble>
                </div>
              )}

              {stage === "qa" && (
                <div key={qaIndex} className="rise space-y-5">
                  <BotBubble>{current.question}</BotBubble>

                  <div className="pt-1">
                    {current.type === "options" ? (
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="group" aria-label={current.question}>
                        {current.options?.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => advanceQa(option)}
                            className="rounded-2xl border border-[#dce4ef] bg-white px-4 py-3 text-left text-[0.88rem] font-semibold text-[#22395f] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#22395f] hover:bg-[#fef5ef] focus:outline-none focus:ring-2 focus:ring-[#fccbb6]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
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
                          // clear the complaint as soon as they start correcting it
                          onInput={() => error && setError("")}
                          aria-invalid={!!error}
                          aria-describedby={error ? "scan-qa-error" : undefined}
                          className={`${chatTyperCls} ${error ? "border-[#c2410c] focus:border-[#c2410c] focus:ring-[#f5c4a8]" : ""}`}
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

                    <FieldError id="scan-qa-error" message={error} />

                    {qaIndex > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setError("")
                          setQaIndex((i) => Math.max(0, i - 1))
                        }}
                        className="mt-3 text-[0.78rem] font-semibold text-[#5f6f88] underline underline-offset-2"
                      >
                        Back
                      </button>
                    )}
                  </div>
                </div>
              )}

              {stage === "review" && (
                <div className="rise space-y-4">
                  <BotBubble>Please confirm that your contact and hair assessment details are correct.</BotBubble>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                            setError("")
                            setQaIndex(i)
                            setEditingReview(true)
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
                        setError("")
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
                      className="btn-wave flex flex-1 items-center justify-center gap-2 rounded-full bg-[#22395f] px-6 py-3.5 text-[0.9rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#16263f]"
                    >
                      <span className="relative z-10">Continue</span>
                    </button>
                  </div>
                </div>
              )}

              {stage === "insight" && (
                <div className="rise space-y-5">
                  <div className="flex items-center gap-2 text-[0.9rem] font-semibold text-[#3a537f]">
                    <LuStethoscope className="h-5 w-5" />
                    Your preliminary care guidance
                  </div>

                  <div className="rounded-2xl bg-[#fef5ef] px-5 py-5 text-[1.08rem] font-bold leading-snug text-[#c8763f]">
                    A specialist consultation is recommended
                  </div>

                  <div className="text-[0.9rem] font-bold text-[#22395f]">Based on your answers</div>

                  <div className="flex gap-3 rounded-2xl border border-[#cdd8ec] bg-[#f2f6fc] px-4 py-4 text-[0.88rem] leading-relaxed text-[#1f2f47]">
                    <LuActivity className="mt-0.5 h-5 w-5 flex-none text-[#3a537f]" />
                    <p>
                      A clinical examination can help identify the type of hair loss and whether monitoring, treatment or
                      a surgical opinion is the most suitable next step.
                    </p>
                  </div>

                  <p className="rounded-2xl bg-[#eef2f7] px-4 py-3 text-[0.78rem] leading-relaxed text-[#5f6f88]">
                    This guidance is not a diagnosis. Your specialist will assess your hair, scalp and medical history.
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
                      className="btn-wave flex flex-1 items-center justify-center rounded-full bg-[#22395f] px-6 py-3.5 text-[0.9rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#16263f]"
                    >
                      <span className="relative z-10">Continue</span>
                    </button>
                  </div>
                </div>
              )}

              {stage === "final" && (
                <div className="rise space-y-4">
                  <BotBubble>
                    Almost done! Please add a clear photo of the affected hair or scalp area to continue to WhatsApp.
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
                      <input type="text" value={answers.name} readOnly className={`${chatInputCls} bg-[#fbf8f5]`} />
                    </label>

                    <label className="space-y-1.5">
                      <span className="pl-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#5f6f88]">
                        Phone number
                      </span>
                      <input type="tel" value={answers.phone} readOnly className={`${chatInputCls} bg-[#fbf8f5]`} />
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

                  <FieldError id="scan-final-error" message={error} />

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    disabled={submitting || !photo}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[0.9rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1fb959] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                    {submitting ? "Please wait…" : !photo ? "Add a photo to continue" : "Continue with WhatsApp"}
                  </button>
                  <p className="text-center text-[0.75rem] leading-relaxed text-[#5f6f88]">
                    By continuing, you agree to be contacted by thereshape about your appointment.
                  </p>
                </div>
              )}

              {stage === "sent" && (
                <div className="rise px-2 py-6 text-center">
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

            {/* ── footer trust strip ─────────────────────────────── */}
            <div className="flex flex-none items-center justify-center gap-2 border-t border-[#e7ecf3] bg-[#fbf8f5] px-5 py-3 text-[0.72rem] font-semibold text-[#5f6f88]">
              <LuLock className="h-3.5 w-3.5 text-[#22395f]" />
              Private &amp; confidential · Reviewed by a certified specialist
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const chatInputCls =
  "w-full rounded-2xl border border-[#e7ecf3] bg-white px-4 py-3 text-[0.92rem] text-[#1f2f47] transition-all duration-150 focus:border-[#22395f] focus:outline-none focus:ring-2 focus:ring-[#fccbb6]"

/* the active "typer" field for the current chat question — pill-shaped to match the round send button */
const chatTyperCls =
  "w-full rounded-full border border-[#e7ecf3] bg-white px-5 py-3.5 text-[0.95rem] text-[#1f2f47] transition-all duration-150 focus:border-[#22395f] focus:outline-none focus:ring-2 focus:ring-[#fccbb6]"

/** Inline validation message. `role="alert"` so screen readers announce it on appearance. */
function FieldError({ id, message }: { id: string; message: string }) {
  if (!message) return null
  return (
    <p
      id={id}
      role="alert"
      className="mt-2.5 flex items-start gap-1.5 text-[0.78rem] font-semibold leading-snug text-[#c2410c]"
    >
      <LuCircleAlert className="mt-[2px] h-3.5 w-3.5 flex-none" />
      {message}
    </p>
  )
}

function BotBubble({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-[#fef5ef] px-4 py-3 text-[0.88rem] leading-relaxed text-[#3a4f6f]">
      {children}
    </div>
  )
}
