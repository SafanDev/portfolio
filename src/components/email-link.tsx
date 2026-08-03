"use client";

import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { siteConfig } from "@/data/site";

type EmailLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  email?: string;
  subject?: string;
};

export default function EmailLink({
  email = siteConfig.email,
  subject = "Portfolio enquiry",
  className,
  children,
  onClick,
  ...props
}: EmailLinkProps) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const emailHref = `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}`;

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (!navigator.clipboard?.writeText) {
      return;
    }

    void navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);

        if (resetTimerRef.current !== null) {
          window.clearTimeout(
            resetTimerRef.current,
          );
        }

        resetTimerRef.current =
          window.setTimeout(() => {
            setCopied(false);
          }, 2200);
      })
      .catch(() => {
        // The mailto link still works even when clipboard
        // permission is unavailable.
      });
  };

  return (
    <a
      {...props}
      href={emailHref}
      className={[
        "email-link",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-copied={copied ? "true" : "false"}
      onClick={handleClick}
    >
      {children}

      <span
        className="email-link__feedback"
        aria-hidden="true"
      >
        Email copied
      </span>

      <span
        className="sr-only"
        aria-live="polite"
      >
        {copied
          ? "Email address copied to clipboard"
          : ""}
      </span>
    </a>
  );
}
