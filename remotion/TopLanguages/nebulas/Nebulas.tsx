import { AbsoluteFill } from "remotion";
import { Nebula1SVG } from "./Nebula1SVG";
import { Nebula2SVG } from "./Nebula2SVG";
import { Nebula3SVG } from "./Nebula3SVG";

const nebulaOpacity = 0.3;
export const Nebulas: React.FC = () => {
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
        }}
      />
      <Nebula2SVG
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          opacity: nebulaOpacity,
        }}
      />
      <Nebula3SVG
        style={{
          position: "absolute",
          left: -400,
          top: 900,
          opacity: nebulaOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
