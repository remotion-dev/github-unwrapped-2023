import React, { useMemo } from "react";
import { PANE_BACKGROUND, PANE_BORDER } from "../TopLanguages/Pane";
import { MergeIcon } from "./MergeIcon";
import { MergeNumber } from "./MergeNumber";
import { PATH_TARGET } from "./make-random-path";

export const MergeStat: React.FC<{
  num: number;
  totalNum: number;
}> = ({ num, totalNum }) => {
  const container: React.CSSProperties = useMemo(() => {
    return {
      backgroundColor: PANE_BACKGROUND,
      border: PANE_BORDER,
      height: 300,
      width: 300,
      borderRadius: "50%",
      position: "absolute",
      left: PATH_TARGET.x,
      top: PATH_TARGET.y,
      transform: "translate(-50%, -50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
    };
  }, []);

  const inner: React.CSSProperties = useMemo(() => {
    return {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    };
  }, []);

  const subtitle: React.CSSProperties = useMemo(() => {
    return {
      fontSize: 24,
      fontFamily: "Mona Sans",
      fontWeight: "800",
      color: "#fff",
    };
  }, []);

  return (
    <div style={container}>
      <div style={inner}>
        <MergeIcon />
        <MergeNumber num={num} />
      </div>
      <div style={subtitle}>
        pull {totalNum === 1 ? "request" : "requests"}
        <br />
        merged
      </div>
    </div>
  );
};
