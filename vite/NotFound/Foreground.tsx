import { AbsoluteFill } from "remotion";

export const Foreground: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <img src="/notFoundForeground.svg" />
    </AbsoluteFill>
  );
};
