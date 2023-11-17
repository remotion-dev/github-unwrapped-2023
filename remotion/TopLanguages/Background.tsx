import { ReactNode } from "react";
import { AbsoluteFill } from "remotion";

export const Background: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <AbsoluteFill
      style={{
        width: 2160,
        height: 2160,
        background:
          "radial-gradient(121.11% 121.11% at 47.08% 100%, #0F102E 0%, #000 100%)",
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
