import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";
import { VIDEO_FPS } from "../../types/constants";
import { Background } from "./Background";
import Cloud1 from "./Cloud-1";
import Cloud2 from "./Cloud-2";
import Planet from "./Planet";
import Swish from "./Swish";

export const LandingScene: React.FC = () => {
  // const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const cloud = spring({
    fps: VIDEO_FPS,
    frame: frame / 4.5,
    config: {
      damping: 100,
    },
  });

  const cloudOffset = interpolate(cloud, [0, 1], [60, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cloudSize = interpolate(cloud, [0, 1], [1, 1.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const planet = spring({
    fps: VIDEO_FPS,
    frame: frame / 3,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,

        background:
          "radial-gradient(121.11% 121.11% at 47.08% 100%, #0F102E 0%, #000 100%)",
      }}
    >
      <AbsoluteFill>
        <Background></Background>
      </AbsoluteFill>
      {/* <h1
        style={{
          fontSize: 100,
          fontFamily: "Mona Sans",
          color: "white",
          opacity: 1,
        }}
      >
        Contributions
      </h1> */}

      <div
        style={{ width: 1600, position: "absolute", top: -720, right: -544 }}
      >
        <Swish />
      </div>

      <div
        style={{
          width: 500 + 50 * cloud,
          position: "absolute",
          bottom: 96 + cloudOffset * 1.7,
          right: -144,
          transform: `scale(${cloudSize})`,
          opacity: (1 - cloud) * 1 + 0.7,
        }}
      >
        <Cloud2 />
      </div>

      <div
        style={{
          width: 400 + 50 * cloud,
          position: "absolute",
          bottom: 64 + cloudOffset * 1.4,
          left: -100,
          transform: `scale(${cloudSize})`,
          opacity: (1 - cloud) * 1 + 0.7,
        }}
      >
        <Cloud1 />
      </div>

      <div
        style={{
          width: 400 + planet * 780,
          position: "absolute",
          left: 340 - planet * (780 / 2),
          bottom: -700 + planet * 80,
        }}
      >
        <Planet />
      </div>
    </AbsoluteFill>
  );
};
