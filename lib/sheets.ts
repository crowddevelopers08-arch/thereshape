// lib/sheets.ts
// Pushes thereshape submissions to the Google Sheet via the Apps Script web app
// (see thereshape-apps-script.gs). One deployment serves both forms; the
// `formType` field decides which tab the row lands in.
//
// Best-effort by design: callers should catch and record the failure without
// blocking the visitor's submission.

/** Tab names — these must match the ones in thereshape-apps-script.gs. */
export const LEADS_TAB = "thereshape Leads"
export const FEEDBACK_TAB = "thereshape Feedback"

export interface SheetLead {
  name: string
  phone: string
  email?: string | null
  area?: string | null // hair concern
  duration?: string | null // how long it has been
  branch?: string | null
  source?: string | null // utm_source or "direct"
  medium?: string | null
  campaign?: string | null
  pageUrl?: string | null
}

export interface SheetFeedback {
  name: string
  email: string
  phone: string
  suggestions: string
  pageUrl?: string | null
  /** Star score from /review, 1–5. 0 when they skipped the rating step. */
  rating?: number | null
}

export interface SheetResult {
  synced: boolean
  raw?: unknown
}

/** Shared transport. Apps Script /exec 302-redirects to its content, and
 *  returns an HTML error page if the script throws before our JSON response. */
async function postToAppsScript(payload: Record<string, unknown>): Promise<SheetResult> {
  const endpoint = process.env.GOOGLE_SHEETS_URL
  if (!endpoint) {
    throw new Error("GOOGLE_SHEETS_URL environment variable is not set")
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: controller.signal,
    })

    const responseText = await response.text()

    let data: { error?: string; success?: boolean } = {}
    try {
      data = responseText ? JSON.parse(responseText) : {}
    } catch {
      throw new Error("Google Sheets returned a non-JSON response")
    }

    if (!response.ok || data.error) {
      throw new Error(data.error || `HTTP ${response.status} from Google Sheets`)
    }

    return { synced: true, raw: data }
  } finally {
    clearTimeout(timeout)
  }
}

export async function sendToGoogleSheet(lead: SheetLead): Promise<SheetResult> {
  return postToAppsScript({
    formType: "lead",
    sheetTab: LEADS_TAB,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    name: lead.name,
    phone: lead.phone.replace(/\D/g, ""),
    email: lead.email || "",
    area: lead.area || "",
    duration: lead.duration || "",
    branch: lead.branch || "Reshape Clinic",
    source: lead.source || "direct",
    medium: lead.medium || "",
    campaign: lead.campaign || "",
    pageUrl: lead.pageUrl || "",
  })
}

export async function sendFeedbackToGoogleSheet(feedback: SheetFeedback): Promise<SheetResult> {
  return postToAppsScript({
    formType: "feedback",
    sheetTab: FEEDBACK_TAB,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    name: feedback.name.trim(),
    email: feedback.email.trim(),
    phone: feedback.phone.replace(/\D/g, ""),
    rating: feedback.rating || "",
    suggestions: feedback.suggestions.trim(),
    pageUrl: feedback.pageUrl || "",
    source: "thereshape — Client Feedback",
  })
}
