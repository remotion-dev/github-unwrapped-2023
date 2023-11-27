import React from "react";
import { Img } from "remotion";
import { z } from "zod";
import { PANE_BACKGROUND, PANE_BORDER } from "./Pane";

const INNER_BORDER_RADIUS = 30;
const PADDING = 20;

const topLanguagesTitle = z.object({
  login: z.string(),
});

export const TopLanguagesTitle: React.FC<z.infer<typeof topLanguagesTitle>> = ({
  login,
}) => (
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
    }}
  >
    <Img
      src={`https://github.com/${login}.png`}
      style={{
        borderRadius: INNER_BORDER_RADIUS,
        height: 120,
        border: PANE_BORDER,
        marginRight: PADDING,
      }}
    />
    <div
      style={{
        color: "white",
        fontSize: 55,
        fontFamily: "Mona Sans",
        fontWeight: 800,
        lineHeight: 1.1,
      }}
    >
      My top <br /> languages
    </div>
  </div>
);
