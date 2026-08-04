import { NextRequest, NextResponse } from "next/server"
import { sendFeedbackToTeleCRM } from "@/lib/telecrm"
import { sendFeedbackToGoogleSheet } from "@/lib/sheets"
import prisma from "@/lib/prisma"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Client feedback from /client-feedback. Delivered to TeleCRM and the Google
// Sheet (the CRM team's system of record) and saved to our own database, the
// same three-destination pattern /api/leads uses.

/** Feedback source label, kept in step with the one lib/sheets.ts sends. */
const SOURCE = "thereshape — Client Feedback"

/** Same rule the booking form enforces client-side, applied again server-side. */
function isValidIndianPhone(raw: string) {
  const cleaned = raw.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "")
  return /^[6-9]\d{9}$/.test(cleaned)
}

function isValidEmail(raw: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim())
}

export async function POST(request: NextRequest) {
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { name = "", email = "", phone = "", suggestions = "", pageUrl = "" } = body

  // Star score from /review. 0 means they reached this page without rating.
  const parsedRating = Number(body.rating)
  const rating = Number.isInteger(parsedRating) && parsedRating >= 1 && parsedRating <= 5 ? parsedRating : 0

  if (!name.trim()) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }
  if (!isValidIndianPhone(phone)) {
    return NextResponse.json({ error: "Please enter a valid 10-digit Indian mobile number." }, { status: 400 })
  }
  if (!suggestions.trim()) {
    return NextResponse.json({ error: "Please share your suggestions." }, { status: 400 })
  }

  const feedback = { name, email, phone, suggestions, pageUrl, rating }

  // All three destinations in parallel; each is independently best-effort.
  const [crmOutcome, sheetOutcome, dbOutcome] = await Promise.allSettled([
    sendFeedbackToTeleCRM(feedback),
    sendFeedbackToGoogleSheet(feedback),
    prisma.feedback.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.replace(/\D/g, ""),
        rating,
        suggestions: suggestions.trim(),
        source: SOURCE,
        pageUrl: pageUrl || null,
      },
    }),
  ])

  let telecrmSynced = false
  let telecrmId: string | null = null
  if (crmOutcome.status === "fulfilled") {
    telecrmSynced = crmOutcome.value.synced
    telecrmId = crmOutcome.value.telecrmId
  } else {
    console.error("TeleCRM feedback sync failed:", crmOutcome.reason)
  }

  let sheetSynced = false
  if (sheetOutcome.status === "fulfilled") {
    sheetSynced = sheetOutcome.value.synced
  } else {
    console.error("Google Sheets feedback sync failed:", sheetOutcome.reason)
  }

  const saved = dbOutcome.status === "fulfilled"
  if (!saved) {
    console.error("Database save failed:", dbOutcome.reason)
  } else if (telecrmSynced || sheetSynced) {
    // Record which integrations actually took it, so a failed delivery can be
    // spotted and replayed from the row itself.
    await prisma.feedback
      .update({
        where: { id: dbOutcome.value.id },
        data: { telecrmSynced, telecrmId, sheetSynced },
      })
      .catch((err) => console.error("Failed to record sync flags on feedback:", err))
  }

  // Captured as long as it reached at least one destination. The database
  // counts: if the row is safely stored, telling the visitor to resubmit would
  // only duplicate it.
  const captured = telecrmSynced || sheetSynced || saved

  return NextResponse.json(
    {
      success: captured,
      telecrmSynced,
      sheetSynced,
      saved,
      message: captured
        ? telecrmSynced && sheetSynced && saved
          ? "Feedback delivered to TeleCRM, Google Sheets and the database"
          : "Feedback captured; one or more integrations failed"
        : "Feedback could not be delivered to any destination",
    },
    { status: captured ? 201 : 502 },
  )
}

/** Feedback for the admin dashboard, newest first — mirrors GET /api/leads. */
export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json({ feedback })
  } catch (error) {
    console.error("Error fetching feedback:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
