import Image from "next/image";
import type { CSSProperties } from "react";

import type { ProjectMedia } from "@/data/projects";
import { mediaMeta } from "@/data/media-meta";

type MediaGalleryProps = {
  items: ProjectMedia[];
  label: string;
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

export default function MediaGallery({ items, label }: MediaGalleryProps) {
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

  return (
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

        if (presentation === "spotlight") {
          return (
            <figure
              key={`${item.src}-${index}`}
              className={`media-card--stable media-card--spotlight media-card--${orientation}`}
              style={style}
            >
              <div className="media-card__spotlight-visual">
                <div className="media-card__spotlight-scroll" tabIndex={0} aria-label={`Scroll to inspect ${item.alt}`}>
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
              <div className="media-card__document-scroll" tabIndex={0} aria-label={`Scroll to inspect ${item.alt}`}>
                {image}
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
              {image}
            </div>
            <figcaption>
              {item.title && <h3>{item.title}</h3>}
              <p>{item.caption}</p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
