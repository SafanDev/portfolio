"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";
import { siteConfig } from "@/data/site";

function copyWithSelectionFallback(text: string) {
  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.setAttribute("aria-hidden", "true");
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto -9999px";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  } finally {
    textarea.remove();
  }

  return copied;
}

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  async function copyEmail() {
    let copiedSuccessfully = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteConfig.email);
        copiedSuccessfully = true;
      }
    } catch {
      copiedSuccessfully = false;
    }

    if (!copiedSuccessfully) {
      copiedSuccessfully = copyWithSelectionFallback(siteConfig.email);
    }

    if (!copiedSuccessfully) {
      window.location.href = `mailto:${siteConfig.email}`;
      return;
    }

    setCopied(true);

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      resetTimerRef.current = null;
    }, 2200);
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
