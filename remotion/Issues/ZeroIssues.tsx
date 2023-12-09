import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Poof } from "../Poof";
import { UfoSvg } from "./UfoSvg";

const UFOS = 9;
export const ZERO_ISSUES_DURATION = 140;

const UfoPosition: React.FC<{
  index: number;
}> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay: index * 3,
  });

  const factor = interpolate(progress, [0, 1], [10, 1]);

  const x = Math.sin((index / UFOS) * Math.PI * 2) * 340 * factor;
  const y = Math.cos((index / UFOS) * Math.PI * 2) * 450 * factor;

  return (
    <div
      style={{
        height: 30,
        width: 70,
        position: "absolute",
        marginLeft: x,
        marginTop: y - 200,
        transform: `scale(1.5)`,
      }}
    >
      <Sequence layout="none" durationInFrames={92}>
        <UfoSvg
          style={{
            width: 70,
          }}
        />
      </Sequence>
      <Sequence from={90}>
        <Poof ufoScale={0.25} x={30} y={23} />
      </Sequence>
    </div>
  );
};

export const ZeroIssues: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [60, 80, 120, ZERO_ISSUES_DURATION],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      {new Array(9).fill(true).map((_, i) => (
        <UfoPosition
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          index={i}
        />
      ))}
      <div
        style={{
          fontFamily: "Mona Sans",
          fontWeight: "bold",
          fontSize: 45,
          marginTop: 650,
          opacity,
        }}
      >
        I take no issue with that.
      </div>
      <Sequence from={90 - 5}>
        <Audio volume={0.5} src={staticFile("ufo-explode-1.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
