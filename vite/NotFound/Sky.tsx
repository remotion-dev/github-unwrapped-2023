import { AbsoluteFill } from "remotion";

export const Sky: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "url('/sky.svg') no-repeat center center fixed",
        backgroundSize: "cover",
        zIndex: -1,
      }}
    />
  );
};
