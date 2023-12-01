import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { PANE_BACKGROUND, PANE_BORDER } from "../TopLanguages/Pane";
import { Wheel } from "./Wheel";

const labelStyle: React.CSSProperties = {
  color: "white",
  fontWeight: "bold",
  fontSize: 45,
  fontFamily: "Mona Sans",
};

export const topDaySchema = z.object({
  value: z.string(),
  label: z.string(),
});

const TOP_DAY_SPACING = 20;

export const TopDay: React.FC<
  z.infer<typeof topDaySchema> & {
    values: string[];
    radius: number;
    renderLabel: (value: string) => React.ReactNode;
    delay: number;
  }
> = ({ value, label, values, radius, renderLabel, delay }) => {
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
        border: PANE_BORDER,
      }}
    >
      <div style={labelStyle}>{label}</div>
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
          <Wheel
            renderLabel={renderLabel}
            radius={radius}
            values={values}
            value={value}
            delay={delay}
          />
        </AbsoluteFill>
      </div>
    </div>
  );
};
