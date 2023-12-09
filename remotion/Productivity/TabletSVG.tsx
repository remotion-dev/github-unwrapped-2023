import React from "react";
import { Img, staticFile } from "remotion";

export const TABLET_BG = "#080817";
export const HANDS_ASSET = staticFile("hands.png");

export const TabletSVG = (props: { style: React.CSSProperties }) => (
  <Img src={HANDS_ASSET} style={props.style} />
);
