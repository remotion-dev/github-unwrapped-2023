import React from "react";
import { Img } from "remotion";
import type { PlanetInfo } from "./constants";
import { StandardPlanet } from "./svgs/planets/StandardPlanet";

export const LanguagePlanet: React.FC<{
  planetInfo: PlanetInfo;
  style: React.CSSProperties;
}> = ({ planetInfo, style }) => {
  if (planetInfo.source) {
    return <Img style={style} src={planetInfo.source} />;
  }

  return (
    <StandardPlanet customColor={planetInfo.customPlanetColor} style={style} />
  );
};
