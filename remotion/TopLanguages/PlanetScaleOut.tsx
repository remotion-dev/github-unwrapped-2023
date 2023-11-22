import { AbsoluteFill } from "remotion";
import { mapLanguageToPlanet } from "./constants";

export const PlanetScaleOut: React.FC = () => {
  const { PlanetSVG, boundingBox } = mapLanguageToPlanet.Java;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PlanetSVG />
    </AbsoluteFill>
  );
};
