"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";

import type { ProjectMedia } from "@/data/projects";
import { mediaMeta } from "@/data/media-meta";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  ExpandIcon,
} from "@/components/icons";

type MediaGalleryProps = {
  items: ProjectMedia[];
  label: string;
  viewerItems?: ProjectMedia[];
};

type MediaStyle = CSSProperties & {
  "--media-natural-width": string;
  "--media-ratio": string;
};

const getOrientation = (item: ProjectMedia) => {
  const dimensions = mediaMeta[item.src] ?? { width: 1600, height: 1000 };

  return item.orientation ?? (
    dimensions.height > dimensions.width
      ? "portrait"
      : dimensions.height === dimensions.width
        ? "square"
        : "wide"
  );
};

export default function MediaGallery({
  items,
  label,
  viewerItems,
}: MediaGalleryProps) {
  const lightboxItems = viewerItems?.length ? viewerItems : items;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isOpen = activeIndex !== null;

  const openLightbox = useCallback((item: ProjectMedia, opener: HTMLElement) => {
    const index = lightboxItems.findIndex((candidate) => candidate.src === item.src);

    openerRef.current = opener;
    setActiveIndex(index >= 0 ? index : 0);
  }, [lightboxItems]);

  const closeLightbox = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
      return;
    }

    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + lightboxItems.length) % lightboxItems.length;
    });
  }, [lightboxItems.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % lightboxItems.length;
    });
  }, [lightboxItems.length]);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!items.length) return null;

  const orientations = items.map(getOrientation);
  const portraitCount = orientations.filter((orientation) => orientation === "portrait").length;
  const allPortrait = portraitCount === items.length;
  const wideOnly = orientations.every((orientation) => orientation === "wide");
  const documentCount = items.filter((item) => item.presentation === "document").length;
  const allDocuments = documentCount === items.length;
  const hasSpotlight = items.some((item) => item.presentation === "spotlight");

  const galleryClasses = [
    "media-gallery--stable",
    wideOnly ? "media-gallery--wide-only" : "",
    allPortrait && !allDocuments ? "media-gallery--portrait-grid" : "",
    allDocuments ? "media-gallery--document-grid" : "",
    hasSpotlight ? "media-gallery--has-spotlight" : "",
  ].filter(Boolean).join(" ");

  const resolvedIndex = activeIndex ?? 0;
  const activeItem = lightboxItems[resolvedIndex] ?? items[0];
  const activeDimensions = mediaMeta[activeItem.src] ?? { width: 1600, height: 1000 };
  const activePresentation = activeItem.presentation ?? "standard";
  const isScrollableDocument = activePresentation === "document" || activePresentation === "spotlight";

  const handleDialogClose = () => {
    setActiveIndex(null);

    requestAnimationFrame(() => {
      openerRef.current?.focus();
    });
  };

  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      closeLightbox();
    }
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (lightboxItems.length < 2) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(lightboxItems.length - 1);
    }
  };

  const handleViewportClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;

    if (target === event.currentTarget || (
      target instanceof HTMLElement &&
      target.classList.contains("image-lightbox__stage")
    )) {
      closeLightbox();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;

    if (!start || lightboxItems.length < 2) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 55 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;

    if (deltaX > 0) {
      showPrevious();
    } else {
      showNext();
    }
  };

  const handleScrollableImageClick = (
    event: MouseEvent<HTMLDivElement>,
    item: ProjectMedia,
  ) => {
    if (event.target instanceof HTMLImageElement) {
      openLightbox(item, event.currentTarget);
    }
  };

  const openCue = (
    <span className="media-card__open-cue" aria-hidden="true">
      <ExpandIcon />
      <span>View fullscreen</span>
    </span>
  );

  return (
    <>
      <div className={galleryClasses} role="group" aria-label={label}>
        {items.map((item, index) => {
          const dimensions = mediaMeta[item.src] ?? { width: 1600, height: 1000 };
          const orientation = orientations[index];
          const presentation = item.presentation ?? "standard";

          const maximumDisplayWidth = orientation === "portrait"
            ? Math.min(dimensions.width, 560)
            : orientation === "square"
              ? Math.min(dimensions.width, 900)
              : Math.min(dimensions.width, 1120);

          const preserveOriginalPixels = dimensions.width < 800 || dimensions.height < 500;

          const style: MediaStyle = {
            "--media-natural-width": `${maximumDisplayWidth}px`,
            "--media-ratio": `${dimensions.width} / ${dimensions.height}`,
          };

          const image = (
            <Image
              src={item.src}
              alt={item.alt}
              width={dimensions.width}
              height={dimensions.height}
              quality={92}
              unoptimized={preserveOriginalPixels}
              className="media-card__image"
              sizes={
                presentation === "spotlight"
                  ? "(max-width: 760px) 92vw, 46vw"
                  : orientation === "portrait"
                    ? "(max-width: 680px) 92vw, 520px"
                    : orientation === "square"
                      ? "(max-width: 960px) 94vw, 900px"
                      : "(max-width: 960px) 94vw, 1040px"
              }
            />
          );

          const fullscreenButton = (
            <button
              type="button"
              className="media-card__open-control"
              aria-label={`View ${item.alt} fullscreen`}
              onClick={(event) => openLightbox(item, event.currentTarget)}
            >
              <ExpandIcon />
              <span>Fullscreen</span>
            </button>
          );

          if (presentation === "spotlight") {
            return (
              <figure
                key={`${item.src}-${index}`}
                className={`media-card--stable media-card--spotlight media-card--${orientation}`}
                style={style}
              >
                <div className="media-card__spotlight-visual">
                  {fullscreenButton}
                  <div
                    className="media-card__spotlight-scroll"
                    tabIndex={0}
                    aria-label={`Scroll to inspect ${item.alt}`}
                    onClick={(event) => handleScrollableImageClick(event, item)}
                  >
                    {image}
                  </div>
                </div>
                <figcaption className="media-card__spotlight-copy">
                  {item.title && <h3>{item.title}</h3>}
                  <p>{item.caption}</p>
                  {item.points?.length ? (
                    <ul>
                      {item.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  ) : null}
                </figcaption>
              </figure>
            );
          }

          if (presentation === "document") {
            return (
              <figure
                key={`${item.src}-${index}`}
                className={`media-card--stable media-card--document media-card--${orientation}`}
                style={style}
              >
                <div className="media-card__document-visual">
                  {fullscreenButton}
                  <div
                    className="media-card__document-scroll"
                    tabIndex={0}
                    aria-label={`Scroll to inspect ${item.alt}`}
                    onClick={(event) => handleScrollableImageClick(event, item)}
                  >
                    {image}
                  </div>
                </div>
                <figcaption>
                  {item.title && <h3>{item.title}</h3>}
                  <p>{item.caption}</p>
                </figcaption>
              </figure>
            );
          }

          return (
            <figure
              key={`${item.src}-${index}`}
              className={`media-card--stable media-card--${orientation}${presentation === "comparison-board" ? " media-card--comparison-board" : ""}`}
              style={style}
            >
              <div className="media-card__image--stable">
                <button
                  type="button"
                  className="media-card__image-trigger"
                  aria-label={`View ${item.alt} fullscreen`}
                  onClick={(event) => openLightbox(item, event.currentTarget)}
                >
                  {image}
                  {openCue}
                </button>
              </div>
              <figcaption>
                {item.title && <h3>{item.title}</h3>}
                <p>{item.caption}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {isOpen ? (
        <dialog
          ref={dialogRef}
          className="image-lightbox"
          aria-label="Fullscreen project image viewer"
          onCancel={(event) => {
            event.preventDefault();
            closeLightbox();
          }}
          onClose={handleDialogClose}
          onClick={handleDialogClick}
          onKeyDown={handleDialogKeyDown}
        >
          <div
            className={`image-lightbox__viewport${isScrollableDocument ? " image-lightbox__viewport--document" : ""}`}
            onClick={handleViewportClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              className="image-lightbox__close"
              aria-label="Close fullscreen image viewer"
              onClick={closeLightbox}
              autoFocus
            >
              <CloseIcon />
            </button>

            {lightboxItems.length > 1 ? (
              <>
                <button
                  type="button"
                  className="image-lightbox__navigation image-lightbox__navigation--previous"
                  aria-label="View previous image"
                  onClick={showPrevious}
                >
                  <ArrowLeftIcon />
                </button>
                <button
                  type="button"
                  className="image-lightbox__navigation image-lightbox__navigation--next"
                  aria-label="View next image"
                  onClick={showNext}
                >
                  <ArrowRightIcon />
                </button>
              </>
            ) : null}

            <div className="image-lightbox__stage">
              <Image
                key={activeItem.src}
                src={activeItem.src}
                alt={activeItem.alt}
                width={activeDimensions.width}
                height={activeDimensions.height}
                unoptimized
                className="image-lightbox__image"
                sizes="100vw"
              />
            </div>

            <p className="sr-only" aria-live="polite">{activeItem.alt}</p>

            <div className="image-lightbox__shortcuts" aria-hidden="true">
              {isScrollableDocument ? <span>Scroll to inspect</span> : null}
              {lightboxItems.length > 1 ? <span>← → Navigate</span> : null}
              <span>Esc Close</span>
            </div>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
