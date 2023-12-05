import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Poof } from "../Poof";
import { UfoSvg } from "./UfoSvg";

const UFOS = 9;

export const UfoPosition: React.FC<{
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
        marginTop: y - 300,
        transform: `scale(1.5)`,
      }}
    >
      <Sequence layout="none" durationInFrames={92}>
        <UfoSvg />
      </Sequence>
      <Sequence from={90}>
        <Poof ufoScale={0.25} x={35} y={15} />
      </Sequence>
    </div>
  );
};

export const ZeroIssues: React.FC = () => {
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
    </AbsoluteFill>
  );
};
