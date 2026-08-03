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

export default function MediaGallery({
  items,
  label,
}: MediaGalleryProps) {
  if (!items.length) {
    return null;
  }

  const hasPortrait = items.some((item) => {
    const dimensions = mediaMeta[item.src] ?? {
      width: 1600,
      height: 1000,
    };

    return (
      item.orientation === "portrait" ||
      (!item.orientation &&
        dimensions.height > dimensions.width)
    );
  });

  return (
    <div
      className={`media-gallery--stable${
        hasPortrait
          ? " media-gallery--mixed"
          : " media-gallery--wide-only"
      }`}
      aria-label={label}
    >
      {items.map((item, index) => {
        const dimensions = mediaMeta[item.src] ?? {
          width: 1600,
          height: 1000,
        };

        const orientation =
          item.orientation ??
          (dimensions.height > dimensions.width
            ? "portrait"
            : dimensions.height === dimensions.width
              ? "square"
              : "wide");

        const maximumDisplayWidth =
          orientation === "portrait"
            ? Math.min(dimensions.width, 420)
            : orientation === "square"
              ? Math.min(dimensions.width, 560)
              : Math.min(dimensions.width, 980);

        const preserveOriginalPixels =
          dimensions.width < 800 ||
          dimensions.height < 500;

        const style: MediaStyle = {
          "--media-natural-width": `${maximumDisplayWidth}px`,
          "--media-ratio": `${dimensions.width} / ${dimensions.height}`,
        };

        return (
          <figure
            key={`${item.src}-${index}`}
            className={`media-card--stable media-card--${orientation}`}
            style={style}
          >
            <div className="media-card__image--stable">
              <Image
                src={item.src}
                alt={item.alt}
                width={dimensions.width}
                height={dimensions.height}
                quality={90}
                unoptimized={preserveOriginalPixels}
                sizes={
                  orientation === "portrait"
                    ? `(max-width: 680px) min(86vw, ${maximumDisplayWidth}px), ${maximumDisplayWidth}px`
                    : orientation === "square"
                      ? `(max-width: 680px) 92vw, ${maximumDisplayWidth}px`
                      : "(max-width: 960px) 94vw, 930px"
                }
              />
            </div>

            <figcaption>{item.caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
