"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { track } from "./track";

/* Leads are saved to our database and pushed to TeleCRM via this API route. */
const LEAD_ENDPOINT = "/api/leads";
const BRANCH = "Reshape Clinic";

export default function CtaBand() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // campaign attribution — filled automatically from the URL
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const q = new URLSearchParams(window.location.search);
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "fbclid",
      "gclid",
    ].forEach((k) => {
      const el = form.querySelector<HTMLInputElement>(`[name="${k}"]`);
      if (el) el.value = q.get(k) || "";
    });
    const pageUrl = form.querySelector<HTMLInputElement>('[name="page_url"]');
    if (pageUrl) pageUrl.value = window.location.href;
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitting(true);
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    const payload = {
      name: raw.name,
      phone: raw.phone,
      email: raw.email,
      area: raw.concern,
      duration: raw.since,
      branch: raw.branch || BRANCH,
      source: raw.utm_source || "direct",
      medium: raw.utm_medium || "",
      campaign: raw.utm_campaign || "",
      pageUrl:
        raw.page_url ||
        (typeof window !== "undefined" ? window.location.href : ""),
      formSource: "Reshape-General-leads",
    };

    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);

      track("lead_submit", { branch: BRANCH, concern: raw.concern });
      setDone(true);
      window.location.href = "/thank-you";
    } catch {
      setSubmitting(false);
      alert("That did not go through. Please call +91 86085 51555 instead.");
    }
  };

  return (
    <section
      id="assessment-form"
      className="scroll-mt-24 bg-white py-8 sm:py-10"
    >
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-[#fccbb6] to-[#fef1ea] shadow-[0_30px_70px_-40px_rgba(34,57,95,0.4)]">
          <div className="grid grid-cols-1 items-stretch md:grid-cols-[1.55fr_1fr]">
            {/* LEFT — copy + inline booking form (shown by default, no popup/click needed) */}
            <div className="relative z-10 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
              <h2 className="text-[clamp(1.5rem,3.4vw,2.5rem)] font-bold leading-[1.1] text-[#22395f]">
                New Advanced Hair Trinity Program{" "}
              </h2>
              <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-[#22395f]/80">
                Personalized • Effective Treatment • Advanced Hair Regrowth{" "}
              </p>

              <form
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                className="mt-6 max-w-[52ch]"
              >
                {!done ? (
                  <div>
                    <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
                      <Field label="Full name" htmlFor="cb-name">
                        <input
                          id="cb-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Your name"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Mobile number" htmlFor="cb-phone">
                        <input
                          id="cb-phone"
                          name="phone"
                          type="tel"
                          required
                          inputMode="numeric"
                          pattern="[6-9][0-9]{9}"
                          title="Enter a 10-digit mobile number starting with 6, 7, 8 or 9."
                          autoComplete="tel"
                          placeholder="10-digit number"
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <Field label="Email address" htmlFor="cb-email">
                      <input
                        id="cb-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={inputCls}
                      />
                    </Field>

                    <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
                      <Field label="Your hair concern" htmlFor="cb-concern">
                        <select
                          id="cb-concern"
                          name="concern"
                          required
                          className={inputCls}
                          defaultValue=""
                        >
                          <option value="">Select a concern</option>
                          <option>Hair Regrowth</option>
                          <option>Hair Loss / Hair Fall</option>
                          <option>Baldness / Receding Hairline</option>
                          <option>Hair Thinning</option>
                          <option>Scalp Health</option>
                          <option>Not sure — need advice</option>
                        </select>
                      </Field>
                      <Field label="How long has it been?" htmlFor="cb-since">
                        <select
                          id="cb-since"
                          name="since"
                          required
                          className={inputCls}
                          defaultValue=""
                        >
                          <option value="">Select duration</option>
                          <option>Under 3 months</option>
                          <option>3 to 12 months</option>
                          <option>Over a year</option>
                        </select>
                      </Field>
                    </div>

                    {/* campaign attribution — filled automatically */}
                    <input type="hidden" name="utm_source" />
                    <input type="hidden" name="utm_medium" />
                    <input type="hidden" name="utm_campaign" />
                    <input type="hidden" name="utm_content" />
                    <input type="hidden" name="utm_term" />
                    <input type="hidden" name="fbclid" />
                    <input type="hidden" name="gclid" />
                    <input type="hidden" name="branch" defaultValue={BRANCH} />
                    <input type="hidden" name="page_url" />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="relative z-10">
                        {submitting ? "Booking…" : "Schedule Your Consultation"}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white/70 px-5 py-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#fef5ef] text-[1.4rem]">
                      ✓
                    </div>
                    <h3 className="mb-1 text-[1.05rem] text-[#22395f]">
                      Booked. We&apos;ll call you shortly.
                    </h3>
                    <p className="text-[0.85rem] text-[#5f6f88]">
                      Our team will reach you on the number you shared to
                      confirm your slot.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* RIGHT — video (full height, no gaps) */}
            <div className="relative h-full w-full min-h-[200px] md:min-h-full">
              <video
                src="https://res.cloudinary.com/n0ccg2u6/video/upload/video_lo1eqb.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                poster="https://your-poster-image-url.jpg"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-[#e7ecf3] bg-white px-3.5 py-2.5 text-[0.9rem] text-[#1f2f47] transition-all duration-150 focus:border-[#22395f] focus:outline-none focus:ring-2 focus:ring-[#fccbb6]";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#5f6f88]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
