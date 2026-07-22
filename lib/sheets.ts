// lib/sheets.ts
// Pushes a thereshape booking lead to the Google Sheet via the Apps Script web
// app (see thereshape-apps-script.gs). Best-effort: callers should catch and
// record the failure without blocking the lead from being saved.

export interface SheetLead {
  name: string
  phone: string
  area?: string | null // hair concern
  duration?: string | null // how long it has been
  branch?: string | null
  source?: string | null // utm_source or "direct"
  medium?: string | null
  campaign?: string | null
  pageUrl?: string | null
}

export interface SheetResult {
  synced: boolean
  raw?: unknown
}

export async function sendToGoogleSheet(lead: SheetLead): Promise<SheetResult> {
  const endpoint = process.env.GOOGLE_SHEETS_URL
  if (!endpoint) {
    throw new Error("GOOGLE_SHEETS_URL environment variable is not set")
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  const payload = {
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    name: lead.name,
    phone: lead.phone.replace(/\D/g, ""),
    area: lead.area || "",
    duration: lead.duration || "",
    branch: lead.branch || "Reshape Clinic",
    source: lead.source || "direct",
    medium: lead.medium || "",
    campaign: lead.campaign || "",
    pageUrl: lead.pageUrl || "",
    sheetTab: "thereshape Leads",
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow", // Apps Script /exec 302-redirects to its content
      signal: controller.signal,
    })

    const responseText = await response.text()

    let data: { error?: string; success?: boolean } = {}
    try {
      data = responseText ? JSON.parse(responseText) : {}
    } catch {
      // Apps Script returns an HTML error page when the script throws before
      // reaching our JSON response — surface that as a failure.
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
