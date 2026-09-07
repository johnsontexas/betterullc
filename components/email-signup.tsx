"use client";

import { useId, useState } from "react";
import { joinWaitlist, type WaitlistSource } from "@/lib/waitlist";

type Variant = "terrarium" | "cogtrack" | "site";

type Palette = {
  accentBg: string;
  accentFg: string;
  accentHover: string;
  fieldBg: string;
  fieldBorder: string;
  fieldText: string;
  placeholder: string;
  muted: string;
  ok: string;
  err: string;
  radius: string;
};

const PALETTES: Record<Variant, Palette> = {
  terrarium: {
    accentBg: "#8990f4",
    accentFg: "#0b0e14",
    accentHover: "#9ba1f7",
    fieldBg: "rgba(255,255,255,0.04)",
    fieldBorder: "rgba(137,144,244,0.32)",
    fieldText: "#e8ebf2",
    placeholder: "#7b8394",
    muted: "#9aa3b4",
    ok: "#c9b8ff",
    err: "#f0a3a3",
    radius: "12px",
  },
  cogtrack: {
    accentBg: "#ffffff",
    accentFg: "#1c0f36",
    accentHover: "#efe7ff",
    fieldBg: "rgba(255,255,255,0.06)",
    fieldBorder: "rgba(255,255,255,0.18)",
    fieldText: "#ffffff",
    placeholder: "rgba(255,255,255,0.5)",
    muted: "#b9a6d6",
    ok: "#c9b8ff",
    err: "#ffb4c4",
    radius: "12px",
  },
  site: {
    accentBg: "#0a8043",
    accentFg: "#ffffff",
    accentHover: "#0b8f4b",
    fieldBg: "#ffffff",
    fieldBorder: "#d7dbe3",
    fieldText: "#10130f",
    placeholder: "#8a9088",
    muted: "#56605a",
    ok: "#0a8043",
    err: "#b42318",
    radius: "12px",
  },
};

export function EmailSignup({
  source,
  variant,
  cta = "Get emailed at launch",
  placeholder = "you@email.com",
  className = "",
}: {
  source: WaitlistSource;
  variant: Variant;
  cta?: string;
  placeholder?: string;
  className?: string;
}) {
  const p = PALETTES[variant];
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "invalid" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading" || state === "done") return;
    setState("loading");
    const r = await joinWaitlist(email, source);
    setState(r === "ok" ? "done" : r === "invalid" ? "invalid" : "error");
  }

  const btnBase: React.CSSProperties = {
    background: p.accentBg,
    color: p.accentFg,
    borderRadius: p.radius,
    fontWeight: 600,
    fontSize: "0.95rem",
    padding: "12px 20px",
    border: "none",
    cursor: state === "loading" ? "default" : "pointer",
    whiteSpace: "nowrap",
    transition: "background .15s, opacity .15s",
    opacity: state === "loading" ? 0.75 : 1,
  };

  if (state === "done") {
    return (
      <p
        className={className}
        role="status"
        style={{ color: p.ok, fontSize: "0.95rem", fontWeight: 500, margin: 0 }}
      >
        You&apos;re on the list — we&apos;ll email you the moment it&apos;s ready.
      </p>
    );
  }

  return (
    <form className={className} onSubmit={submit} noValidate style={{ maxWidth: "26rem" }}>
      <label htmlFor={inputId} className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        Email address
      </label>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "invalid" || state === "error") setState("idle");
          }}
          style={{
            flex: "1 1 12rem",
            minWidth: 0,
            background: p.fieldBg,
            border: `1px solid ${p.fieldBorder}`,
            borderRadius: p.radius,
            color: p.fieldText,
            fontSize: "0.95rem",
            padding: "12px 14px",
            outline: "none",
          }}
        />
        <button type="submit" style={btnBase} disabled={state === "loading"}>
          {state === "loading" ? "…" : cta}
        </button>
      </div>
      <p
        aria-live="polite"
        style={{
          margin: "8px 0 0",
          fontSize: "0.8rem",
          minHeight: "1.1em",
          color: state === "invalid" || state === "error" ? p.err : p.muted,
        }}
      >
        {state === "invalid"
          ? "That doesn't look like an email address."
          : state === "error"
            ? "Something went wrong — try again in a moment."
            : "No spam. One email, when it launches."}
      </p>
    </form>
  );
}
