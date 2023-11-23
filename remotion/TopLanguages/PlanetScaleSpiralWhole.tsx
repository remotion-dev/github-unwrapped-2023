import { reversePath, translatePath } from "@remotion/paths";
import { makeCircle } from "@remotion/shapes";
import { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { z } from "zod";
import { moveAlongLine } from "../move-along-line";
import type { spiralSchema } from "./PlanetScaleSpiral";
import { mapLanguageToPlanet } from "./constants";
import { remapSpeed } from "./remap-speed";
import {
  NewRocketSVG,
  TL_ROCKET_HEIGHT,
  TL_ROCKET_WIDTH,
} from "./svgs/NewRocketSVG";
import SkySVG from "./svgs/SkySVG";

const frameAtEnd = 120;

const progress = ({
  f,
  start,
  loop,
  offset,
}: {
  f: number;
  start: number;
  loop: boolean;
  offset: number;
}) => {
  const unit = 40;
  const unclamped = f - start + (offset * unit) / (2 * Math.PI);
  const current = loop ? unclamped % unit : unclamped;
  return current / unit;
};

const getPath = (r: number, canvasWidth: number, canvasHeight: number) => {
  return translatePath(
    reversePath(makeCircle({ radius: r }).path),
    canvasWidth / 2 - r,
    canvasHeight / 2 - r
  );
};

export const PlanetScaleSpiralWhole: React.FC<z.infer<typeof spiralSchema>> = ({
  language,
  showHelperLine,
  startRotationInRadians,
}) => {
  const { PlanetSVG } = mapLanguageToPlanet[language];

  const frame = useCurrentFrame();
  const spedUpFrame = remapSpeed(frame, (f) =>
    interpolate(f, [0, 200], [1, 2])
  );

  const { width, height } = useVideoConfig();

  const getRadius = (f: number) =>
    interpolate(f, [0, 100], [width / 3.5, width / 2.5]);

  const radius = getRadius(frame);
  const radiusAtEnd = getRadius(frameAtEnd);

  const path = getPath(radius, width, height);
  const pathAtEnd = useMemo(() => {
    return getPath(radiusAtEnd, width, height);
  }, [height, radiusAtEnd, width]);

  const isOverEnd = spedUpFrame > frameAtEnd;

  const positionAtend = useMemo(() => {
    return moveAlongLine(
      pathAtEnd,
      progress({
        f: frameAtEnd,
        start: 0,
        loop: true,
        offset: startRotationInRadians,
      })
    );
  }, [pathAtEnd, startRotationInRadians]);

  const xAtEnd = useMemo(() => {
    return (
      positionAtend.offset.x +
      Math.cos(positionAtend.angleInRadians) * radiusAtEnd * 2 * Math.PI
    );
  }, [positionAtend.angleInRadians, positionAtend.offset.x, radiusAtEnd]);

  const yAtEnd = useMemo(() => {
    return (
      positionAtend.offset.y +
      Math.sin(positionAtend.angleInRadians) * radiusAtEnd * 2 * Math.PI
    );
  }, [positionAtend.angleInRadians, positionAtend.offset.y, radiusAtEnd]);

  const outOfOrbitLine = useMemo(() => {
    return `M ${positionAtend.offset.x} ${positionAtend.offset.y} L ${xAtEnd} ${yAtEnd}`;
  }, [positionAtend.offset.x, positionAtend.offset.y, xAtEnd, yAtEnd]);

  const currentPosition = useMemo(() => {
    if (isOverEnd) {
      return moveAlongLine(
        outOfOrbitLine,
        progress({
          f: spedUpFrame,
          start: frameAtEnd,
          loop: false,
          offset: 0,
        })
      );
    }

    return moveAlongLine(
      path,
      progress({
        f: spedUpFrame,
        start: 0,
        loop: true,
        offset: startRotationInRadians,
      })
    );
  }, [isOverEnd, outOfOrbitLine, path, spedUpFrame, startRotationInRadians]);

  return (
    <AbsoluteFill>
      {showHelperLine ? (
        <AbsoluteFill>
          <svg viewBox={`0 0 1080 1080`}>
            <path d={outOfOrbitLine} fill="transparent" stroke="white" />
          </svg>
        </AbsoluteFill>
      ) : null}
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(#DD8B5A, #0A0A1B)",
          opacity: 0.2,
        }}
      />
      <AbsoluteFill>
        <SkySVG style={{ transform: "scale(6)", opacity: 0.3 }} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PlanetSVG />
      </AbsoluteFill>
      <NewRocketSVG
        style={{
          transform: `translateX(${
            currentPosition.offset.x - TL_ROCKET_WIDTH / 2
          }px) translateY(${
            currentPosition.offset.y - TL_ROCKET_HEIGHT / 2
          }px) rotate(${currentPosition.angleInDegrees}deg) scale(0.5)`,
        }}
      />
    </AbsoluteFill>
  );
};
