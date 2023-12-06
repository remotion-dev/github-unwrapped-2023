import React, { useCallback, useRef, useState } from "react";
import { AbsoluteFill, spring } from "remotion";
import { PlayButtonSVG } from "./PlayButtonSVG";
import styles from "./playbutton.module.css";

const HIDE_ANIMATION = 500;

export const PlayButton: React.FC<{
  onPlay: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ onPlay }) => {
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
        const start = Date.now();
        document.body.classList.add("videoplaying");

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
      [onPlay],
    );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClickPlayButton}
    >
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
          <PlayButtonSVG isHovering={isHovering} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
