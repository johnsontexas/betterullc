// Public "email me at launch" signups.
//
// These are the project's PUBLISHABLE Supabase values — safe to ship in the
// browser bundle (that's what publishable keys are for). The waitlist table has
// row-level security: anon can INSERT only, and there is no public read policy,
// so the list itself is never exposed here. Read it from the Supabase dashboard.
const SUPABASE_URL = "https://yzxuupveyyonvrzaeefp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_LV972rq-8atTjp9azv9QNQ_j5WGLwMu";

export type WaitlistSource = "general" | "terrarium" | "cogtrack";

export type JoinResult = "ok" | "invalid" | "error";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function joinWaitlist(
  rawEmail: string,
  source: WaitlistSource,
): Promise<JoinResult> {
  const email = rawEmail.trim().toLowerCase();
  if (email.length < 3 || email.length > 254 || !EMAIL_RE.test(email)) {
    return "invalid";
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist_signups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email, source }),
    });

    // 201 = added. 409 = the (lower(email), source) unique index tripped —
    // they're already on the list, which is a success from the visitor's view.
    if (res.ok || res.status === 409) return "ok";
    return "error";
  } catch {
    return "error";
  }
}
