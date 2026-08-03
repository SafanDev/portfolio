"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { DownloadIcon } from "@/components/icons";
import { navigation, siteConfig } from "@/data/site";

type SiteHeaderProps = {
  compact?: boolean;
};

function getSectionId(href: string) {
  return href.startsWith("#") ? href.slice(1) : href;
}

export default function SiteHeader({
  compact = false,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isHomePage = pathname === "/";
  const useRootNavigation = compact || !isHomePage;

  const resolveNavigationHref = (href: string) =>
    useRootNavigation ? `/${href}` : href;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    let frame = 0;

    const updateHeaderState = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);

        if (pathname !== "/") {
          return;
        }

        const activationLine = Math.min(
          window.innerHeight * 0.32,
          220,
        );

        let nextActiveSection = "home";

        for (const item of navigation) {
          const sectionId = getSectionId(item.href);
          const section = document.getElementById(sectionId);

          if (
            section &&
            section.getBoundingClientRect().top <=
              activationLine
          ) {
            nextActiveSection = sectionId;
          }
        }

        const pageBottom =
          window.scrollY + window.innerHeight;
        const documentHeight =
          document.documentElement.scrollHeight;

        if (pageBottom >= documentHeight - 4) {
          nextActiveSection = getSectionId(
            navigation[navigation.length - 1].href,
          );
        }

        setActiveSection((currentSection) =>
          currentSection === nextActiveSection
            ? currentSection
            : nextActiveSection,
        );
      });
    };

    updateHeaderState();

    window.addEventListener("scroll", updateHeaderState, {
      passive: true,
    });
    window.addEventListener("resize", updateHeaderState);
    window.addEventListener("hashchange", updateHeaderState);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
      window.removeEventListener(
        "hashchange",
        updateHeaderState,
      );
    };
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (mobileMenuOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }

      const focusFrame = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      return () => {
        cancelAnimationFrame(focusFrame);
      };
    }

    if (dialog.open) {
      dialog.close();
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow =
        previousHtmlOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia(
      "(min-width: 961px)",
    );

    const handleViewportChange = (
      event: MediaQueryListEvent,
    ) => {
      if (event.matches) {
        setMobileMenuOpen(false);
      }
    };

    desktopMediaQuery.addEventListener(
      "change",
      handleViewportChange,
    );

    return () => {
      desktopMediaQuery.removeEventListener(
        "change",
        handleViewportChange,
      );
    };
  }, []);

  const handleDialogClick = (
    event: MouseEvent<HTMLDialogElement>,
  ) => {
    if (event.target === event.currentTarget) {
      closeMobileMenu();
    }
  };

  const handleDialogClose = () => {
    setMobileMenuOpen(false);

    if (
      window.matchMedia("(max-width: 960px)").matches
    ) {
      menuButtonRef.current?.focus();
    }
  };

  return (
    <>
      <header
        className={`site-header${
          isScrolled ? " is-scrolled" : ""
        }${compact ? " is-compact" : ""}`}
      >
        <div className="site-header__inner">
          <Link
            href="/"
            className="brand-logo"
            aria-label="Safan portfolio home"
          >
            <Image
              src="/icon.svg"
              alt=""
              width={38}
              height={38}
              className="brand-logo__image"
              preload
            />
          </Link>

          <nav
            className="desktop-nav"
            aria-label="Primary navigation"
          >
            {navigation.map((item) => {
              const sectionId = getSectionId(item.href);
              const isActive =
                isHomePage && activeSection === sectionId;

              return (
                <Link
                  key={item.href}
                  href={resolveNavigationHref(item.href)}
                  className={isActive ? "is-active" : undefined}
                  aria-current={
                    isActive ? "location" : undefined
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <a
              href={siteConfig.cv}
              download
              className="button button--secondary cv-button"
              aria-label="Download Mohamed Safan's resume"
            >
              Resume
              <DownloadIcon />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              className="menu-button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              onClick={() => {
                setMobileMenuOpen((isOpen) => !isOpen);
              }}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="mobile-nav"
        aria-labelledby="mobile-navigation-title"
        onCancel={(event) => {
          event.preventDefault();
          closeMobileMenu();
        }}
        onClose={handleDialogClose}
        onClick={handleDialogClick}
      >
        <div
          className="mobile-nav__panel"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mobile-nav__top">
            <p
              id="mobile-navigation-title"
              className="mobile-nav__title"
            >
              Navigation
            </p>

            <button
              ref={closeButtonRef}
              type="button"
              className="mobile-nav__close"
              aria-label="Close navigation"
              onClick={closeMobileMenu}
            >
              <span />
              <span />
            </button>
          </div>

          <nav aria-label="Mobile navigation">
            {navigation.map((item) => {
              const sectionId = getSectionId(item.href);
              const isActive =
                isHomePage && activeSection === sectionId;

              return (
                <Link
                  key={item.href}
                  href={resolveNavigationHref(item.href)}
                  className={isActive ? "is-active" : undefined}
                  aria-current={
                    isActive ? "location" : undefined
                  }
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              );
            })}

            <a
              href={siteConfig.cv}
              download
              className="nav-resume"
              onClick={closeMobileMenu}
            >
              Download Resume
              <DownloadIcon />
            </a>
          </nav>
        </div>
      </dialog>
    </>
  );
}
