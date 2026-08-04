// Clinic details for thereshape — Advanced Hair Trinity Program.
// Update here and the standalone pages (/review, /client-feedback) follow.

export const BRAND = "thereshape"
export const BRAND_FULL = "thereshape — Advanced Hair Trinity Program"
export const BRANCH = "Reshape Clinic"

/** Primary line — the number shown in the navbar and used for tel: CTAs. */
export const PHONE_DISPLAY = "+91 86085 51555"
export const PHONE_TEL = "+918608551555"

/** Every line in display order, for the places that list them together. */
export const PHONES = [{ display: PHONE_DISPLAY, tel: PHONE_TEL }] as const

export const WHATSAPP_URL = "https://wa.me/918608551555"

export const EMAIL = "reshapeclinic01@gmail.com"

export const INSTAGRAM_URL = "https://www.instagram.com/the_reshape_clinic/"
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61581875403848&sk=about"

export const ADDRESS_SHORT = "Mylapore, Chennai"
export const ADDRESS_FULL =
  "No: 149, No: 1 Luz Church Road, Bhaskarapuram, Mylapore, Chennai - 600004"

/* ── Image assets ──────────────────────────────────────────────────────────
   Served from Cloudinary — nothing is read out of /public.                 */
const CDN = "https://res.cloudinary.com/n0ccg2u6/image/upload"

export const IMAGES = {
  /** Navy lockup on a white plate — use on light backgrounds (white cards,
      the header pill). This is the only logo that is legible on white. */
  logoDark: `${CDN}/v1785391578/26696b2b-7228-4b02-afae-af43ef094d7d_fs8cq8.jpg`,
  /** White lockup, transparent background — use ONLY on navy/dark surfaces
      such as the footer. It disappears on anything light. */
  logoLight: `${CDN}/v1785391579/reshape-logo-removebg-preview_vv7uc4.png`,
  /** Favicon-sized mark. */
  favicon: `${CDN}/favlogo_kiluez.png`,
} as const

/* ── Review funnel (/review → Google or /client-feedback) ──────────────────
   The clinic's Google Business Profile "Ask for reviews" link — 4★ and above
   go straight here, landing on the review composer with the star picker open.
   The fallback below only takes over if this is ever reset to a placeholder. */
export const GOOGLE_REVIEW_URL = "https://g.page/r/CcxiMz1AV5jyEBM/review"

/** Google Maps query — the clinic's registered address. */
export const MAP_QUERY = "Reshape Clinic, Luz Church Road, Mylapore, Chennai 600004"

export const GOOGLE_REVIEW_FALLBACK_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(MAP_QUERY)

/** True while GOOGLE_REVIEW_URL is still the untouched placeholder. */
export const REVIEW_LINK_IS_PLACEHOLDER = GOOGLE_REVIEW_URL.includes("REPLACE_WITH")
