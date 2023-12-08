import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { Planet } from "../../src/config";
import { GoldPlanet } from "./Planet";
import { getOrbEnter } from "./orb-enter";
import { IcePlanet } from "./orbs/IcePlanet";
import { SilverPlanet } from "./orbs/SilverPlanet";

export const PlanetAsset: React.FC<{
  planet: Planet;
}> = ({ planet }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { offset, scale } = getOrbEnter({ fps, frame });

  const style: React.CSSProperties = useMemo(() => {
    return {
      scale: String(scale),
      marginTop: offset,
    };
  }, [offset, scale]);

  return (
    <AbsoluteFill style={style}>
      {planet === "Silver" && <SilverPlanet />}
      {planet === "Ice" && <IcePlanet />}
      {planet === "Gold" && <GoldPlanet />}
    </AbsoluteFill>
  );
};
