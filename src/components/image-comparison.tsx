"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useState,
} from "react";

import { CompareIcon } from "@/components/icons";
import { mediaMeta } from "@/data/media-meta";

type ImageComparisonProps = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  caption: string;
};

type ComparisonStyle = CSSProperties & {
  "--comparison": string;
  "--comparison-ratio": string;
  "--comparison-max-width": string;
};

export default function ImageComparison({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  caption,
}: ImageComparisonProps) {
  const [position, setPosition] = useState(50);

  const beforeDimensions = mediaMeta[before] ?? {
    width: 390,
    height: 844,
  };

  const afterDimensions = mediaMeta[after] ?? {
    width: 390,
    height: 844,
  };

  const sourceWidth = Math.min(
    beforeDimensions.width,
    afterDimensions.width,
  );

  const displayWidth = Math.min(
    560,
    Math.max(340, Math.round(sourceWidth * 0.72)),
  );

  const style: ComparisonStyle = {
    "--comparison": `${position}%`,
    "--comparison-ratio": `${afterDimensions.width} / ${afterDimensions.height}`,
    "--comparison-max-width": `${displayWidth}px`,
  };

  return (
    <figure className="comparison" style={style}>
      <div className="comparison__stage">
        <div className="comparison__image comparison__image--after">
          <Image
            src={after}
            alt={afterAlt}
            width={afterDimensions.width}
            height={afterDimensions.height}
            unoptimized
            sizes={`${displayWidth}px`}
            className="comparison__asset"
          />

          <span>{afterLabel}</span>
        </div>

        <div className="comparison__image comparison__image--before">
          <Image
            src={before}
            alt={beforeAlt}
            width={beforeDimensions.width}
            height={beforeDimensions.height}
            unoptimized
            sizes={`${displayWidth}px`}
            className="comparison__asset"
          />

          <span>{beforeLabel}</span>
        </div>

        <div
          className="comparison__divider"
          aria-hidden="true"
        >
          <CompareIcon />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={position}
          onChange={(event) => {
            setPosition(Number(event.target.value));
          }}
          aria-label="Compare the design before and after feedback"
          aria-valuetext={`${position}% of the before design visible`}
        />
      </div>

      <figcaption>{caption}</figcaption>
    </figure>
  );
}
