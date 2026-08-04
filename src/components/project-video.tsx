"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { PlayIcon } from "@/components/icons";

type ProjectVideoProps = {
  src: string;
  poster: string;
  title: string;
  durationLabel: string;
};

type SafariVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

const SEEK_SECONDS = 5;

export default function ProjectVideo({
  src,
  poster,
  title,
  durationLabel,
}: ProjectVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const helpId = useId();
  const [hasStarted, setHasStarted] = useState(false);
  const [announcement, setAnnouncement] = useState("Video paused");
  const [seekFeedback, setSeekFeedback] = useState<{
    id: number;
    direction: "backward" | "forward";
    label: string;
  } | null>(null);
  const seekFeedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (seekFeedbackTimerRef.current) {
        clearTimeout(seekFeedbackTimerRef.current);
      }
    };
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setAnnouncement("Playback could not start");
      }
    } else {
      video.pause();
    }
  };

  const toggleFullscreen = async () => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current as SafariVideoElement | null;

    if (!wrapper || !video) {
      return;
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      if (wrapper.requestFullscreen) {
        await wrapper.requestFullscreen();
        return;
      }

      if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
        return;
      }

      setAnnouncement("Fullscreen is not available");
    } catch {
      setAnnouncement("Fullscreen is not available");
    }
  };

  const seekBy = (seconds: number) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const duration = Number.isFinite(video.duration)
      ? video.duration
      : Number.POSITIVE_INFINITY;

    video.currentTime = Math.min(
      duration,
      Math.max(0, video.currentTime + seconds),
    );

    const direction = seconds < 0 ? "backward" : "forward";

    setAnnouncement(
      direction === "backward"
        ? `Moved back ${SEEK_SECONDS} seconds`
        : `Moved forward ${SEEK_SECONDS} seconds`,
    );

    if (seekFeedbackTimerRef.current) {
      clearTimeout(seekFeedbackTimerRef.current);
    }

    setSeekFeedback({
      id: Date.now(),
      direction,
      label:
        direction === "backward"
          ? `−${SEEK_SECONDS}s`
          : `+${SEEK_SECONDS}s`,
    });

    seekFeedbackTimerRef.current = setTimeout(() => {
      setSeekFeedback(null);
    }, 650);
  };

  const handleKeyDown = async (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.repeat
    ) {
      return;
    }

    if (event.target instanceof HTMLButtonElement) {
      return;
    }

    const key = event.key.toLowerCase();

    if (event.code === "Space" || key === "k") {
      event.preventDefault();
      event.stopPropagation();
      await togglePlayback();
      return;
    }

    if (key === "arrowleft") {
      event.preventDefault();
      event.stopPropagation();
      seekBy(-SEEK_SECONDS);
      return;
    }

    if (key === "arrowright") {
      event.preventDefault();
      event.stopPropagation();
      seekBy(SEEK_SECONDS);
      return;
    }

    if (key === "home") {
      event.preventDefault();
      event.stopPropagation();

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        setAnnouncement("Moved to the beginning");
      }

      return;
    }

    if (key === "end") {
      const video = videoRef.current;

      if (video && Number.isFinite(video.duration)) {
        event.preventDefault();
        event.stopPropagation();
        video.currentTime = video.duration;
        setAnnouncement("Moved to the end");
      }

      return;
    }

    if (key === "f") {
      event.preventDefault();
      event.stopPropagation();
      await toggleFullscreen();
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.target instanceof HTMLButtonElement
    ) {
      return;
    }

    const key = event.key.toLowerCase();

    if (
      event.code === "Space" ||
      key === "k" ||
      key === "arrowleft" ||
      key === "arrowright" ||
      key === "home" ||
      key === "end" ||
      key === "f"
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const startPlayback = async () => {
    setHasStarted(true);
    await togglePlayback();
    wrapperRef.current?.focus({ preventScroll: true });
  };

  return (
    <div
      id="walkthrough"
      ref={wrapperRef}
      className="project-video"
      tabIndex={0}
      role="group"
      aria-label={`${title} project walkthrough video`}
      aria-describedby={helpId}
      onKeyDownCapture={handleKeyDown}
      onKeyUpCapture={handleKeyUp}
    >
      <p id={helpId} className="sr-only">
        Keyboard controls: Space or K plays and pauses. Left and right arrow
        keys move five seconds. Home and End move to the beginning and end. F
        toggles fullscreen.
      </p>

      <video
        ref={videoRef}
        className="project-video__player"
        controls={hasStarted}
        playsInline
        preload="none"
        poster={poster}
        aria-label={`${title} project walkthrough`}
        onPlay={() => {
          setHasStarted(true);
          setAnnouncement("Video playing");
        }}
        onPause={() => setAnnouncement("Video paused")}
        onEnded={() => setAnnouncement("Video ended")}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support HTML video.
      </video>

      {seekFeedback && (
        <span
          key={seekFeedback.id}
          className={`project-video__seek-feedback project-video__seek-feedback--${seekFeedback.direction}`}
          aria-hidden="true"
        >
          <span className="project-video__seek-feedback-icon">
            <i />
            <i />
          </span>

          <span className="project-video__seek-feedback-value">
            {seekFeedback.direction === "backward" ? "−5 sec" : "+5 sec"}
          </span>
        </span>
      )}

      {!hasStarted && (
        <button
          type="button"
          className="project-video__launch"
          onClick={startPlayback}
          aria-label={`Play ${title} walkthrough`}
        >
          <span className="project-video__play" aria-hidden="true">
            <PlayIcon />
          </span>

          <span className="project-video__duration" aria-hidden="true">
            {durationLabel}
          </span>
        </button>
      )}

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </div>
  );
}
