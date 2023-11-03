"use client";

import { Player as RemotionPlayer } from "@remotion/player";
import { Main } from "../../remotion/MyComp/Main";
import {
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";

const player: React.CSSProperties = {
  width: "100%",
};

const playerWrapper: React.CSSProperties = {
  width: 450,
  height: 450,
  borderRadius: 3,
  border: "1px solid rgba(0, 169, 157, 1)",
  overflow: "hidden",
};

export const Player: React.FC<{
  inputProps: {
    title: string;
  };
}> = ({ inputProps }) => {
  return (
    <div style={playerWrapper}>
      <RemotionPlayer
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
