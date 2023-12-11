import React, { useCallback, useRef, useState } from "react";
import { AbsoluteFill, spring } from "remotion";
import { isWebkit } from "../../../remotion/Opening/devices";
import { PlayButtonSVG } from "./PlayButtonSVG";
import { PrefetchProgress } from "./PrefetchProgress";
import styles from "./playbutton.module.css";

const HIDE_ANIMATION = 500;

export const PlayButton: React.FC<{
  onPlay: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  progress: number;
}> = ({ onPlay, progress }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        const { current } = ref;
        if (!current) {
          return;
        }

        current.click();
      }
    },
    [],
  );

  const [isHovering, setIsHovering] = useState(false);
  const onClickPlayButton: React.MouseEventHandler<HTMLDivElement> =
    useCallback(
      (e) => {
        if (progress < 1) {
          return;
        }

        const start = Date.now();
        document.body.classList.add("videoplaying");

        if (isWebkit()) {
          onPlay(e);
          return;
        }

        const loop = () => {
          const { current } = ref;
          if (!current) {
            return;
          }

          const timePassed = Date.now() - start;

          const spr = spring({
            fps: 1000,
            frame: timePassed,
            reverse: true,
          });

          current.style.scale = String(spr);

          if (timePassed >= HIDE_ANIMATION) {
            onPlay(e);

            return;
          }

          requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
      },
      [onPlay, progress],
    );

  const fakeProgress = 0.5;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClickPlayButton}
      aria-disabled={fakeProgress < 1}
    >
      {progress < 1 ? <PrefetchProgress progress={progress} /> : null}
      <div
        className={styles.playbutton}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          ref={ref}
          tabIndex={0}
          style={{ borderRadius: 119 }}
          onKeyDown={handleKeyDown}
        >
          <PlayButtonSVG isHovering={isHovering} disabled={progress < 1} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
