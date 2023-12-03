import React, { useCallback, useRef } from "react";
import { AbsoluteFill, spring } from "remotion";
import styles from "./playbutton.module.css";

const HIDE_ANIMATION = 500;

export const PlayButton: React.FC<{
  onPlay: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ onPlay }) => {
  const ref = useRef<HTMLDivElement>(null);

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
      <div className={styles.playbutton}>
        <div
          ref={ref}
          style={{
            width: 200,
            height: 200,
            backgroundColor: "white",
            borderRadius: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 30px rgba(0,0,0,0.3)",
            flexDirection: "column",
            color: "#353CA3",
          }}
        >
          <svg
            style={{
              height: 90,
              marginLeft: 15,
            }}
            viewBox="0 0 384 512"
          >
            <path
              fill="#353CA3"
              d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
