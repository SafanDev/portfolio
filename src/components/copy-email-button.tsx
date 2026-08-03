"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";
import { siteConfig } from "@/data/site";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  }

  return (
    <button type="button" className="copy-email" onClick={copyEmail}>
      <span>{copied ? "Email copied" : "Copy email"}</span>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
