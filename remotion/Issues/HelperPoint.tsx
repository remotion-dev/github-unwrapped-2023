import { AbsoluteFill } from "remotion";

const RADIUS = 20;

export const HelperPoint: React.FC<{
  x: number;
  y: number;
}> = ({ x, y }) => {
  return (
    <AbsoluteFill>
      <div
        style={{
          left: x - RADIUS / 2,
          top: y - RADIUS / 2,
          height: RADIUS,
          width: RADIUS,
          position: "absolute",
          backgroundColor: "red",
          borderRadius: RADIUS / 2,
        }}
      ></div>
    </AbsoluteFill>
  );
};
