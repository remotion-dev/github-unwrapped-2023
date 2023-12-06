import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { PANE_BACKGROUND, PANE_BORDER } from "./Pane";
import { RotatingPlanet } from "./RotatingPlanet";

const INNER_BORDER_RADIUS = 30;
const PADDING = 20;

const topLanguagesTitle = z.object({
  pluralize: z.boolean(),
  randomizePlanetSeed: z.string(),
});

export const TopLanguagesTitle: React.FC<z.infer<typeof topLanguagesTitle>> = ({
  pluralize,
  randomizePlanetSeed,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const spr = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: PANE_BACKGROUND,
        border: PANE_BORDER,
        padding: PADDING,
        paddingRight: PADDING * 2,
        alignItems: "center",
        borderRadius: INNER_BORDER_RADIUS + PADDING,
        scale: String(spr),
      }}
    >
      <div
        style={{
          borderRadius: INNER_BORDER_RADIUS,
          height: 120,
          width: 120,
          marginRight: PADDING,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RotatingPlanet randomSeed={randomizePlanetSeed} />
      </div>
      <div
        style={{
          color: "white",
          fontSize: 55,
          fontFamily: "Mona Sans",
          fontWeight: 800,
          lineHeight: 1.1,
        }}
      >
        My top <br /> {pluralize ? "languages" : "language"}
      </div>
    </div>
  );
};
