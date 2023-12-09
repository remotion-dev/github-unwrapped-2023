import type { PlayerRef } from "@remotion/player";
import { Player } from "@remotion/player";
import { useCallback, useEffect, useMemo } from "react";
import type { z } from "zod";
import { Main, calculateDuration } from "../../../remotion/Main";
import { MAXIMUM_NUMBER_OF_AUDIO_TAGS } from "../../../remotion/audio-tags";
import type { compositionSchema } from "../../../src/config";
import { VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "../../../types/constants";
import { PlayState } from "./PlayState";
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
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: React.RefObject<PlayerRef>;
}> = ({ inputProps, isPlaying, setIsPlaying, playerRef }) => {
  useEffect(() => {
    const { current } = playerRef;
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
      const { current } = playerRef;

      if (!current) {
        return;
      }

      current.play(e);
    },
    [playerRef],
  );

  const onClickPauseButton = useCallback(() => {
    const { current } = playerRef;

    if (!current) {
      return;
    }

    current.pause();
  }, [playerRef]);

  useEffect(() => {
    const { current } = playerRef;

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
  }, [playerRef]);

  const durationInFrames = useMemo(() => {
    return calculateDuration(inputProps);
  }, [inputProps]);

  return (
    <div style={outer}>
      <Player
        ref={playerRef}
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
        spaceKeyToPlayOrPause
      />
      <PlayState
        isPlaying={isPlaying}
        props={{
          rocket: inputProps.rocket,
          planetType: inputProps.planet,
          durationInFrames,
          language1: inputProps.topLanguages?.language1 ?? null,
          language2: inputProps.topLanguages?.language2 ?? null,
          language3: inputProps.topLanguages?.language3 ?? null,
          login: inputProps.login,
        }}
        onClickPauseButton={onClickPauseButton}
        onClickPlayButton={onClickPlayButton}
      />
    </div>
  );
};
