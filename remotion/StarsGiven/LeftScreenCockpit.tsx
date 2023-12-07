import React, { useMemo } from "react";
import { AbsoluteFill } from "remotion";

export const CockpitLeftScreen: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const outer: React.CSSProperties = useMemo(() => {
    return {
      transform: "scale(.43) translateX(-460px) translateY(1048px)",
    };
  }, []);

  const inner: React.CSSProperties = useMemo(() => {
    return {
      transform: `matrix3d(0.304437, -0.106834, 0, 0.00011, 
            0.135913, 0.347567, 0, 0.00005, 
            0, 0, 1, 0, 
            64, 140, 0, 1)`,
      transformOrigin: "0px 0px 0px",
    };
  }, []);

  return (
    <AbsoluteFill style={outer}>
      <AbsoluteFill style={inner}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
