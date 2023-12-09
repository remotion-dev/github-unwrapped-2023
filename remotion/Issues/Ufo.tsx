import type { SVGProps } from "react";
import { interpolate, useVideoConfig } from "remotion";
import { UfoSvg } from "./UfoSvg";

export const UFO_WIDTH = 322;
export const UFO_HEIGHT = 208;

export const Ufo = ({
  x,
  y,
  scale,
  explodeAfter,
  yOffset,
  exit,
  column,
  columns,
  ...props
}: SVGProps<SVGSVGElement> & {
  x: number;
  y: number;
  scale: number;
  columns: number;
  column: number;
  explodeAfter: number;
  yOffset: number;
  exit: number;
}) => {
  const { width } = useVideoConfig();
  const actualUfoWidth = UFO_WIDTH * scale;
  const actualUfoHeight = UFO_HEIGHT * scale;

  const toLeft = column < columns / 2;
  // Bug: Don't know why 30px offset is needed
  const offsetDistance = width / 2 + actualUfoWidth + 30;

  const exitOffset = interpolate(
    exit,
    [0, 1],
    [0, toLeft ? -offsetDistance : offsetDistance],
  );

  return (
    <div>
      <UfoSvg
        style={{
          width: actualUfoWidth,
          height: actualUfoHeight,
          position: "absolute",
          left: x - actualUfoWidth / 2 + exitOffset,
          top: y - actualUfoHeight / 2 + yOffset,
        }}
        fill="none"
        {...props}
      />
    </div>
  );
};
