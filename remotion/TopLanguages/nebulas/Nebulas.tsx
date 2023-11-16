import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TOP_LANGUAGES_DURATION } from "../../../types/constants";
import { Nebula1SVG } from "./Nebula1SVG";
import { Nebula2SVG } from "./Nebula2SVG";
import { Nebula3SVG } from "./Nebula3SVG";

const nebulaOpacity = 0.3;
export const Nebulas: React.FC = () => {
  const frame = useCurrentFrame();
  const nebulaBottomTranslate = interpolate(
    frame,
    [0, TOP_LANGUAGES_DURATION],
    [0, 500]
  );

  const nebulaTopLeftProgress = interpolate(
    frame,
    [0, TOP_LANGUAGES_DURATION],
    [0, 1]
  );

  return (
    <AbsoluteFill>
      {/* <Cloud1SVG style={{ position: "absolute", left: 790, bottom: 30 }} />
      <Cloud2SVG style={{ position: "absolute", left: 0, bottom: 120 }} />
      <Cloud3SVG style={{ position: "absolute", left: 960, top: 1000 }} /> */}
      <Nebula1SVG
        style={{
          position: "absolute",
          left: 300,
          top: 0,
          opacity: nebulaOpacity,
          transform: `translateX(${nebulaTopLeftProgress * 100}px) rotate(${
            nebulaTopLeftProgress * 10
          }deg)`,
        }}
      />
      <Nebula2SVG
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          opacity: nebulaOpacity,
          transform: `translateX(${nebulaTopLeftProgress * 100}px)`,
        }}
      />
      <Nebula3SVG
        style={{
          position: "absolute",
          left: -400,
          top: 900,
          opacity: nebulaOpacity,
          transform: `translateX(${nebulaBottomTranslate}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
