import React from "react";
import type { z } from "zod";
import type { CompositionProps } from "../../remotion/props";
import { GradientBox } from "../GradientBox/GradientBox";
import { BottomPageRow } from "./BottomRow";
import { PlayerContainer } from "./Player";
import { Sidebar } from "./Sidebar";
import styles from "./styles.module.css";

const row: React.CSSProperties = {
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
};

export const VideoBox: React.FC<{
  inputProps: z.infer<typeof CompositionProps>;
}> = ({ inputProps }) => {
  return (
    <GradientBox
      style={{
        display: "flex",
        flexDirection: "column",
        width: "calc(100% - 50px)",
        maxWidth: 1000,
        marginTop: 60,
        marginBottom: 60,
      }}
    >
      <BottomPageRow />
      <div style={row} className={styles.roworcolumn}>
        <PlayerContainer inputProps={inputProps} />
        <Sidebar inputProps={inputProps} />
      </div>
    </GradientBox>
  );
};
