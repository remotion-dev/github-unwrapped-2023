import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { days } from "../../src/config";
import { PANE_BACKGROUND, PANE_BORDER } from "../TopLanguages/Pane";
import { Wheel } from "./Wheel";

const label: React.CSSProperties = {
  color: "white",
  fontWeight: "bold",
  fontSize: 45,
  fontFamily: "Mona Sans",
};

export const topDaySchema = z.object({
  day: z.enum(days),
});

const TOP_DAY_SPACING = 20;

export const TopDay: React.FC<z.infer<typeof topDaySchema>> = ({ day }) => {
  const maskImage = `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 70%, transparent 100%)`;

  return (
    <div
      style={{
        marginTop: TOP_DAY_SPACING,
        marginLeft: TOP_DAY_SPACING,
        marginRight: TOP_DAY_SPACING,
        display: "flex",
        backgroundColor: PANE_BACKGROUND,
        height: 200,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 50,
        borderRadius: 50,
        position: "relative",
        overflow: "hidden",
        border: "2px solid " + PANE_BORDER,
      }}
    >
      <div style={label}>Most productive day</div>
      <div
        style={{
          position: "absolute",
          right: 0,
          backgroundImage:
            "linear-gradient(90deg, #ffffff00 0%, #ffffff20 100%)",
          height: "100%",
          width: 400,
        }}
      >
        <AbsoluteFill
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          <Wheel day={day} />
        </AbsoluteFill>
      </div>
    </div>
  );
};
