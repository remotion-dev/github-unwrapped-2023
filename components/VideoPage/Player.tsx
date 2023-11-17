"use client";

import { Player as RemotionPlayer } from "@remotion/player";
import { Main } from "../../remotion/Main";
import {
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import styles from "./player.module.css";

const player: React.CSSProperties = {
  width: "100%",
};

export const Player: React.FC<{
  inputProps: {
    title: string;
  };
}> = ({ inputProps }) => {
  return (
    <div className={styles.playerWrapper}>
      <RemotionPlayer
        // TODO: Optimize
        numberOfSharedAudioTags={10}
        component={Main}
        inputProps={inputProps}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        compositionHeight={VIDEO_HEIGHT}
        compositionWidth={VIDEO_WIDTH}
        style={player}
        controls
        autoPlay
        loop
      />
    </div>
  );
};
