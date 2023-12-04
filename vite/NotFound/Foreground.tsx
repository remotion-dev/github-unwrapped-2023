import { AbsoluteFill } from "remotion";

export const Foreground: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        zIndex: -1,
      }}
    >
      <img src="/notFoundForeground.svg" />
    </AbsoluteFill>
  );
};
