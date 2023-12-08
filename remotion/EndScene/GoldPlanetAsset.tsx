import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";
import type { Planet } from "../../src/config";
import { VIDEO_FPS } from "../../types/constants";
import { GoldPlanet } from "./Planet";
import { IcePlanet } from "./orbs/IcePlanet";

export const PlanetAsset: React.FC<{
  planet: Planet;
}> = ({ planet }) => {
  const frame = useCurrentFrame();

  const moveUp = spring({
    fps: VIDEO_FPS,
    frame: frame / 12,
    config: {
      damping: 200,
    },
  });

  const marginTop = interpolate(moveUp, [0, 1], [200, 0]);

  const style: React.CSSProperties = useMemo(() => {
    return {
      marginTop,
    };
  }, [marginTop]);

  return (
    <AbsoluteFill style={style}>
      {planet === "Ice" && <IcePlanet />}
      {planet === "Gold" && <GoldPlanet />}
    </AbsoluteFill>
  );
};
