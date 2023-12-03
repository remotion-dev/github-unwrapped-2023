import type { PlayerRef } from "@remotion/player";
import { Player } from "@remotion/player";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AbsoluteFill } from "remotion";
import type { z } from "zod";
import { Main, calculateDuration } from "../../../remotion/Main";
import { MAXIMUM_NUMBER_OF_AUDIO_TAGS } from "../../../remotion/audio-tags";
import type { compositionSchema } from "../../../src/config";
import { VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "../../../types/constants";
import { PlayButton } from "./PlayButton";
import styles from "./styles.module.css";

const outer: React.CSSProperties = {
  width: "100%",
  aspectRatio: 1,
  overflow: "hidden",
  position: "relative",
};

const player: React.CSSProperties = {
  width: "100%",
  aspectRatio: 1,
  overflow: "hidden",
};

export const PlayerContainer: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
}> = ({ inputProps }) => {
  const ref = useRef<PlayerRef>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const { current } = ref;
    if (!current) {
      return;
    }

    const onPlay = () => {
      setIsPlaying(true);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    current.addEventListener("play", onPlay);
    current.addEventListener("pause", onPause);

    return () => {
      current.removeEventListener("play", onPlay);
      current.removeEventListener("pause", onPause);
    };
  });

  const onClickPlayButton = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { current } = ref;

      if (!current) {
        return;
      }

      current.play(e);
    },
    [],
  );

  const onClickPauseButton = useCallback(() => {
    const { current } = ref;

    if (!current) {
      return;
    }

    current.pause();
  }, []);

  useEffect(() => {
    const { current } = ref;

    if (!current) {
      return;
    }

    const onPlay = () => {
      document.body.classList.add("videoplaying");
    };

    const onPause = () => {
      document.body.classList.remove("videoplaying");
    };

    current.addEventListener("play", onPlay);
    current.addEventListener("pause", onPause);
    return () => {
      current.removeEventListener("play", onPlay);
      current.removeEventListener("pause", onPause);
    };
  }, []);

  const durationInFrames = useMemo(() => {
    return calculateDuration(inputProps);
  }, [inputProps]);

  return (
    <div style={outer}>
      <Player
        ref={ref}
        numberOfSharedAudioTags={MAXIMUM_NUMBER_OF_AUDIO_TAGS}
        component={Main}
        inputProps={inputProps}
        durationInFrames={durationInFrames}
        fps={VIDEO_FPS}
        compositionHeight={VIDEO_HEIGHT}
        compositionWidth={VIDEO_WIDTH}
        style={player}
        className={styles.playerradius}
        loop
      />
      {isPlaying ? (
        <AbsoluteFill onClick={onClickPauseButton} />
      ) : (
        <PlayButton onPlay={onClickPlayButton} />
      )}
    </div>
  );
};
