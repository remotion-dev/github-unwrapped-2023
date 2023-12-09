import React from "react";
import type { ImgProps } from "remotion";
import { Img, staticFile } from "remotion";

export const UFO_ASSET = staticFile("ufo.png");

export const UfoSvg: React.FC<Pick<ImgProps, "style">> = ({ style }) => {
  return <Img src={UFO_ASSET} style={style} />;
};
