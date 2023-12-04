import React from "react";
import { OffthreadVideo } from "remotion";

// TODO: Fix this
const IS_SAFARI = false;

export const TransparentVideo: React.FC<{
  safari: string;
  other: string;
  style: React.CSSProperties;
}> = ({ safari, other, style }) => {
  if (IS_SAFARI) {
    return <OffthreadVideo style={style} transparent src={safari} />;
  }

  return <OffthreadVideo style={style} transparent src={other} />;
};
