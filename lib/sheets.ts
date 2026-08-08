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
export const HAIR_SCAN_TAB = "thereshape Hair Scan"
export const SCAN_TAB = "thereshape Scan"

/**
 * The guided assessment flows collect a field set (location, most-noticeable
 * area, family history) that the generic Leads columns cannot hold, so each
 * gets its own identically-shaped tab. A form source missing from this map
 * falls through to the Leads tab and those three fields are dropped.
 */
const ASSESSMENT_ROUTES: Record<string, { formType: string; sheetTab: string }> = {
  // components/hair-scan-component/ChatBooking.tsx
  "Hair Scan Chat": { formType: "hairscan", sheetTab: HAIR_SCAN_TAB },
  // components/scan/BookingModal.tsx
  "Scan Popup": { formType: "scan", sheetTab: SCAN_TAB },
}

export interface SheetLead {
  name: string
  phone: string
  email?: string | null
  location?: string | null // city / location — hair-scan chat flow only
  area?: string | null // hair concern
  duration?: string | null // how long it has been
  hairLossArea?: string | null // most noticeable area — hair-scan chat flow only
  familyHistory?: string | null // hair-scan chat flow only
  branch?: string | null
  source?: string | null // utm_source or "direct"
  medium?: string | null
  campaign?: string | null
  pageUrl?: string | null
  formSource?: string | null // which form captured the lead — see ASSESSMENT_FORM_SOURCES
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
  const shared = {
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    name: lead.name,
    phone: lead.phone.replace(/\D/g, ""),
    email: lead.email || "",
    branch: lead.branch || "Reshape Clinic",
    source: lead.source || "direct",
    medium: lead.medium || "",
    campaign: lead.campaign || "",
    pageUrl: lead.pageUrl || "",
  }

  // The guided assessment flows collect extra fields (location, most-noticeable
  // area, family history) that the homepage forms don't — those go to their own
  // tab instead of being squeezed into the shared Leads columns.
  const route = lead.formSource ? ASSESSMENT_ROUTES[lead.formSource] : undefined
  if (route) {
    return postToAppsScript({
      ...shared,
      formType: route.formType,
      sheetTab: route.sheetTab,
      location: lead.location || "",
      primaryConcern: lead.area || "",
      hairLossDuration: lead.duration || "",
      hairLossArea: lead.hairLossArea || "",
      familyHistory: lead.familyHistory || "",
      // recorded in the tab too, so a row that landed via doPost's sniffing
      // fallback can still be traced to the form that captured it
      formSource: lead.formSource || "",
    })
  }

  return postToAppsScript({
    ...shared,
    formType: "lead",
    sheetTab: LEADS_TAB,
    area: lead.area || "",
    duration: lead.duration || "",
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
