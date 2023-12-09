import React from "react";
import type { ImgProps } from "remotion";
import { Img, staticFile } from "remotion";

export const UfoSvg: React.FC<Pick<ImgProps, "style">> = ({ style }) => {
  return <Img src={staticFile("ufo.png")} style={style} />;
};
