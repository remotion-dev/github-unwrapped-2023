import { AbsoluteFill, Img, staticFile } from "remotion";

export const BACKGROUND_MOUNTAINS_IMAGE = staticFile(
  "background-mountains.png",
);

export const BackgroundMountains = () => (
  <AbsoluteFill
    style={{
      justifyContent: "flex-end",
      alignItems: "flex-end",
    }}
  >
    <Img src={BACKGROUND_MOUNTAINS_IMAGE} />
  </AbsoluteFill>
);
