import React from "react";
import type { z } from "zod";
import type { CompositionProps } from "../../types/constants";
import { GradientBox } from "../GradientBox/GradientBox";
import { BottomRow } from "./BottomRow";
import { PlayerContainer } from "./Player";
import { Sidebar } from "./Sidebar";

const row: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

export const VideoBox: React.FC<{
  inputProps: z.infer<typeof CompositionProps>;
}> = ({ inputProps }) => {
  return (
    <GradientBox style={{ display: "flex", flexDirection: "column" }}>
      <div style={row}>
        <PlayerContainer inputProps={inputProps} />
        <Sidebar inputProps={inputProps} />
      </div>
      <BottomRow />
    </GradientBox>
  );
};
