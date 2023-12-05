import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

const WIDTH = 30;
const HEIGHT = 165;

export const shineSchema = z.object({
  rotation: z.number().step(0.1),
  showHelpers: z.boolean(),
});

export const SHINES_ASSETS = staticFile("shine.png");

export const Shine: React.FC<z.infer<typeof shineSchema>> = ({
  rotation,
  showHelpers,
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const innerRadius = 200;

  const progress = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const perspective = interpolate(progress, [0, 1], [800, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const offset = interpolate(progress, [0, 1], [0, 900]);

  const angle = 20;

  const x = Math.sin(rotation) * innerRadius;
  const y = Math.cos(rotation) * innerRadius;

  const rotationX = Math.cos(rotation) * angle;
  const rotationY = -Math.sin(rotation) * angle;

  const style: React.CSSProperties = useMemo(() => {
    return {
      perspective,
      transform: `translateX(${x}px) translateY(${y}px)`,
      opacity: interpolate(frame, [0, 5], [0, 0.2], {
        extrapolateRight: "clamp",
      }),
    };
  }, [frame, perspective, x, y]);

  const inner: React.CSSProperties = useMemo(() => {
    return {
      justifyContent: "center",
      alignItems: "center",
      transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg) rotateZ(${-rotation}rad)`,
    };
  }, [rotation, rotationX, rotationY]);

  const img: React.CSSProperties = useMemo(() => {
    return {
      width: WIDTH,
      height: HEIGHT,
      marginTop: HEIGHT + offset,
    };
  }, [offset]);

  return (
    <AbsoluteFill style={style}>
      <AbsoluteFill style={inner}>
        <Img style={img} src={SHINES_ASSETS} />
      </AbsoluteFill>{" "}
      {showHelpers ? (
        <div
          style={{
            top: height / 2 - 5,
            left: width / 2 - 5,
            position: "absolute",
            backgroundColor: "green",
            height: 10,
            width: 10,
          }}
        />
      ) : null}
      {showHelpers ? (
        <div
          style={{
            top: y + height / 2 - 5,
            left: x + width / 2 - 5,
            position: "absolute",
            backgroundColor: "red",
            height: 10,
            width: 10,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

export const ShineSequence: React.FC<{
  rotationShake: number;
  i: number;
}> = ({ i, rotationShake }) => {
  return (
    <AbsoluteFill
      style={{
        transform: `translateY(200px)`,
        scale: String(1.5),
      }}
    >
      <Shine
        rotation={random(i) * Math.PI + Math.PI / 2 + rotationShake}
        showHelpers={false}
      />
    </AbsoluteFill>
  );
};

const sequenceStyle = {
  transform: `translateY(200px)`,
  scale: String(1.5),
};

export const Shines: React.FC<{
  xShake: number;
  yShake: number;
  rotationShake: number;
}> = ({ xShake, yShake, rotationShake }) => {
  const sequences = useMemo(() => {
    return new Array(200).fill(true).map((a, i) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <Sequence
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          from={i * 1.5}
          style={sequenceStyle}
          durationInFrames={10}
        >
          <ShineSequence
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            i={i}
            rotationShake={rotationShake}
          />
        </Sequence>
      );
    });
  }, [rotationShake]);

  const outer: React.CSSProperties = useMemo(() => {
    return {
      alignItems: "center",
      justifyContent: "center",
      transform: `translateX(${xShake * 0.5}px) translateY(${yShake * 0.5}px)`,
    };
  }, [xShake, yShake]);

  return <AbsoluteFill style={outer}>{sequences}</AbsoluteFill>;
};
