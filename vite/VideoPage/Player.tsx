import type { PlayerRef } from "@remotion/player";
import { Player } from "@remotion/player";
import { useEffect, useRef } from "react";
import type { z } from "zod";
import { Main } from "../../remotion/Main";
import type { compositionSchema } from "../../remotion/props";
import {
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import styles from "./styles.module.css";

const player: React.CSSProperties = {
  width: "100%",
  aspectRatio: 1,
  overflow: "hidden",
};

export const PlayerContainer: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
}> = ({ inputProps }) => {
  const ref = useRef<PlayerRef>(null);

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

  return (
    <Player
      // TODO: Optimize
      ref={ref}
      numberOfSharedAudioTags={10}
      component={Main}
      inputProps={inputProps}
      durationInFrames={DURATION_IN_FRAMES}
      fps={VIDEO_FPS}
      compositionHeight={VIDEO_HEIGHT}
      compositionWidth={VIDEO_WIDTH}
      style={player}
      className={styles.playerradius}
      clickToPlay
      loop
    />
  );
};
