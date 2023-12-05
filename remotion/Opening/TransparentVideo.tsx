import React from "react";
import { OffthreadVideo } from "remotion";

const isIosSafari = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const isSafari = Boolean(
    navigator.userAgent.match(/Version\/[\d.]+.*Safari/),
  );
  const isChrome = Boolean(navigator.userAgent.match(/CriOS\//));
  return isSafari || isChrome;
};

export const TransparentVideo: React.FC<{
  safari: string;
  other: string;
  style: React.CSSProperties;
}> = ({ safari, other, style }) => {
  if (isIosSafari()) {
    return <OffthreadVideo muted style={style} transparent src={safari} />;
  }

  return <OffthreadVideo muted style={style} transparent src={other} />;
};
