import { reversePath, translatePath } from "@remotion/paths";
import { makeCircle } from "@remotion/shapes";
import { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
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

const frameAtStart = 15;
const frameAtEnd = 110;

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
  const unclamped = f - start - frameAtStart + (offset * unit) / (2 * Math.PI);
  const current = loop ? unclamped % unit : unclamped;
  return current / unit;
};

const getPath = (r: number, canvasWidth: number, canvasHeight: number) => {
  return translatePath(
    reversePath(makeCircle({ radius: r }).path),
    canvasWidth / 2 - r,
    canvasHeight / 2 - r,
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
    interpolate(f, [0, 200], [1, 2]),
  );

  const { width, height } = useVideoConfig();

  const getRadius = (f: number) =>
    interpolate(f, [frameAtStart, frameAtEnd], [width / 3.5, width / 2.5]);

  const radius = getRadius(frame);
  const radiusAtStart = getRadius(frameAtStart);
  const radiusAtEnd = getRadius(frameAtEnd);

  const pathAtStart = useMemo(() => {
    return getPath(radiusAtStart, width, height);
  }, [height, radiusAtStart, width]);

  const pathInOrbit = getPath(radius, width, height);

  const pathAtEnd = useMemo(() => {
    return getPath(radiusAtEnd, width, height);
  }, [height, radiusAtEnd, width]);

  const isBeforeStart = spedUpFrame < frameAtStart;
  const isOverEnd = spedUpFrame > frameAtEnd;

  const positionAtStart = useMemo(() => {
    return moveAlongLine(
      pathAtStart,
      progress({
        f: frameAtStart,
        start: 0,
        loop: true,
        offset: startRotationInRadians,
      }),
    );
  }, [pathAtStart, startRotationInRadians]);

  const positionAtEnd = useMemo(() => {
    return moveAlongLine(
      pathAtEnd,
      progress({
        f: frameAtEnd,
        start: 0,
        loop: true,
        offset: startRotationInRadians,
      }),
    );
  }, [pathAtEnd, startRotationInRadians]);

  const outOfOrbitLine = useMemo(() => {
    const xAtEnd =
      positionAtEnd.offset.x +
      Math.cos(positionAtEnd.angleInRadians) * radiusAtEnd * 2 * Math.PI;

    const yAtEnd =
      positionAtEnd.offset.y +
      Math.sin(positionAtEnd.angleInRadians) * radiusAtEnd * 2 * Math.PI;

    return `M ${positionAtEnd.offset.x} ${positionAtEnd.offset.y} L ${xAtEnd} ${yAtEnd}`;
  }, [positionAtEnd, radiusAtEnd]);

  const intoOrbitLine = useMemo(() => {
    const xAtStart =
      positionAtStart.offset.x -
      Math.cos(positionAtStart.angleInRadians) * radiusAtStart * 2 * Math.PI;

    const yAtStart =
      positionAtStart.offset.y -
      Math.sin(positionAtStart.angleInRadians) * radiusAtStart * 2 * Math.PI;

    return reversePath(
      `M ${positionAtStart.offset.x} ${positionAtStart.offset.y} L ${xAtStart} ${yAtStart}`,
    );
  }, [positionAtStart, radiusAtStart]);

  const currentPosition = useMemo(() => {
    if (isBeforeStart) {
      return moveAlongLine(
        intoOrbitLine,
        interpolate(spedUpFrame, [0, frameAtStart], [0, 1], {
          easing: Easing.in(Easing.ease),
        }),
      );
    }

    if (isOverEnd) {
      return moveAlongLine(
        outOfOrbitLine,
        progress({
          f: spedUpFrame,
          start: frameAtEnd - frameAtStart,
          loop: false,
          offset: 0,
        }),
      );
    }

    return moveAlongLine(
      pathInOrbit,
      progress({
        f: spedUpFrame,
        start: 0,
        loop: true,
        offset: startRotationInRadians,
      }),
    );
  }, [
    intoOrbitLine,
    isBeforeStart,
    isOverEnd,
    outOfOrbitLine,
    pathInOrbit,
    spedUpFrame,
    startRotationInRadians,
  ]);

  return (
    <AbsoluteFill>
      {showHelperLine ? (
        <AbsoluteFill>
          <svg viewBox={`0 0 1080 1080`}>
            <path d={outOfOrbitLine} fill="transparent" stroke="white" />
          </svg>
        </AbsoluteFill>
      ) : null}
      {showHelperLine ? (
        <AbsoluteFill>
          <svg viewBox={`0 0 1080 1080`}>
            <path d={intoOrbitLine} fill="transparent" stroke="green" />
          </svg>
        </AbsoluteFill>
      ) : null}

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
