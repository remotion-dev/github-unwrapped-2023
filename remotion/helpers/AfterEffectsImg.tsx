import { useMemo } from "react";
import { AbsoluteFill, Img } from "remotion";
import {
  rotateZ,
  scale,
  transformsToCssString,
  translateX,
  translateY,
} from "../transforms-helper";

export const AfterEffectsImg: React.FC<{
  width: number;
  height: number;
  src: string;
  scale?: number;
  anchorPoint?: [number, number];
  position?: [number, number];
  rotationInDegrees?: number;
}> = ({
  width,
  height,
  src,
  scale: scaleFactor,
  anchorPoint,
  position,
  rotationInDegrees: rotationInDegrees,
}) => {
  const style: React.CSSProperties = useMemo(() => {
    return {
      width,
      height,
      transformOrigin: anchorPoint
        ? `${anchorPoint[0]}px ${anchorPoint[1]}px`
        : "center center",
      transform: transformsToCssString([
        translateX(-width / 2),
        translateY(-height / 2),
        position ? translateX(position[0]) : undefined,
        position ? translateY(position[1]) : undefined,
        rotationInDegrees ? rotateZ(rotationInDegrees) : undefined,
        scaleFactor ? scale(scaleFactor) : undefined,
      ]),
    };
  }, [anchorPoint, height, position, rotationInDegrees, scaleFactor, width]);

  return (
    <AbsoluteFill>
      <Img style={style} src={src}></Img>
    </AbsoluteFill>
  );
};
