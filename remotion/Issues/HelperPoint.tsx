import { AbsoluteFill } from "remotion";

const RADIUS = 10;

export const HelperPoint: React.FC<{
  x: number;
  y: number;
  color: string;
}> = ({ x, y, color }) => {
  return (
    <AbsoluteFill>
      <div
        style={{
          left: x - RADIUS / 2,
          top: y - RADIUS / 2,
          height: RADIUS,
          width: RADIUS,
          position: "absolute",
          backgroundColor: color,
          borderRadius: RADIUS / 2,
        }}
      ></div>
    </AbsoluteFill>
  );
};
