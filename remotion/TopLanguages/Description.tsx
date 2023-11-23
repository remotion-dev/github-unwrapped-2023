import { AbsoluteFill } from "remotion";
import { PANE_BACKGROUND, PANE_BORDER } from "./Pane";

export const Description: React.FC = () => {
  return (
    <AbsoluteFill>
      <div
        style={{
          color: "white",
          fontSize: 90,
          top: 200,
          position: "absolute",
          left: 1200,
          fontFamily: "Mona Sans",
          fontWeight: 800,
          lineHeight: 1.2,
          backgroundColor: PANE_BACKGROUND,
          padding: "20px 40px",
          borderRadius: 10,
          border: PANE_BORDER,
        }}
      >
        Your top <br /> languages <br /> of 2023
      </div>
    </AbsoluteFill>
  );
};
