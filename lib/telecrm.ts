// lib/telecrm.ts
// Pushes a thereshape booking lead to TeleCRM. Best-effort: callers should
// catch and record the failure without blocking the lead from being saved.

export interface TeleCRMLead {
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

export interface TeleCRMResult {
  synced: boolean
  telecrmId: string | null
  raw?: unknown
}

const FALLBACK_PAGE = "https://thereshape.in/"

export async function sendToTeleCRM(lead: TeleCRMLead): Promise<TeleCRMResult> {
  const endpoint = process.env.TELECRM_API_URL
  if (!endpoint) {
    throw new Error("TELECRM_API_URL environment variable is not set")
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  const sourceURL = lead.pageUrl || FALLBACK_PAGE
  const branch = lead.branch || "Reshape Clinic"

  const payload = {
    fields: {
      Id: "",
      name: lead.name,
      phone: lead.phone.replace(/\D/g, ""),
      Country: "",
      LeadID: "",
      CreatedOn: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      "Lead Stage": "",
      "Lead Status": "new",
      "Lead Request Type": "consultation",
      PageName: sourceURL,
      Source_URL: sourceURL,
      Branch: branch,
      Area_of_Pain: lead.area || "",
      Duration: lead.duration || "",
      FormName: "thereshape lp leads",
      Lead_Source: lead.source || "direct",
      Campaign: lead.campaign || "",
      Medium: lead.medium || "",
      Source: sourceURL,
    },
    actions: [
      { type: "SYSTEM_NOTE", text: `Branch: ${branch}` },
      { type: "SYSTEM_NOTE", text: `Hair concern: ${lead.area || "Not specified"}` },
      { type: "SYSTEM_NOTE", text: `Duration: ${lead.duration || "Not specified"}` },
      { type: "SYSTEM_NOTE", text: `Campaign source: ${lead.source || "direct"}` },
      { type: "SYSTEM_NOTE", text: `Campaign: ${lead.campaign || "Not specified"}` },
      { type: "SYSTEM_NOTE", text: `Landing page: ${sourceURL}` },
    ],
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TELECRM_API_KEY}`,
        "X-Client-ID": "nextjs-website-integration",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    // TeleCRM commonly returns 204 No Content on success.
    if (response.status === 204) {
      return { synced: true, telecrmId: null }
    }

    const responseText = await response.text()

    if (
      responseText.trim().startsWith("<!DOCTYPE") ||
      responseText.trim().startsWith("<html") ||
      responseText.includes("<!DOCTYPE html>")
    ) {
      throw new Error("TeleCRM returned an HTML response instead of JSON")
    }

    const data = responseText ? JSON.parse(responseText) : {}
    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status} from TeleCRM`)
    }

    return {
      synced: true,
      telecrmId: data?.id || data?.leadId || null,
      raw: data,
    }
  } finally {
    clearTimeout(timeout)
  }
}
