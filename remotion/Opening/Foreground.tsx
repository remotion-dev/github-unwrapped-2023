import { AbsoluteFill, Img, staticFile } from "remotion";

export const FOREGROUND_IMAGE = staticFile("foreground.png");

export const Foreground = () => (
  <AbsoluteFill
    style={{
      justifyContent: "flex-end",
    }}
  >
    <Img style={{ width: "100%" }} src={FOREGROUND_IMAGE} />
  </AbsoluteFill>
);
