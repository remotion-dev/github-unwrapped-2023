import { useMemo } from "react";
import { getFlame } from "../../../remotion/Opening/TakeOff";
import { getSideRocketSource } from "../../../remotion/Spaceship";
import type { Rocket } from "../../../src/config";

const rocketWrapper: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
};

const rocketStyle: React.CSSProperties = {
  maxHeight: 300,
  zIndex: 1,
};

export const ModalRocket: React.FC<{
  rocket: Rocket;
}> = ({ rocket }) => {
  const source = useMemo(() => {
    return getSideRocketSource(rocket);
  }, [rocket]);

  const fireSource = rocket ? getFlame(rocket) : undefined;

  return (
    <div style={rocketWrapper}>
      <img src={source} style={rocketStyle} />
      <video
        src={fireSource}
        muted
        loop
        playsInline
        autoPlay
        style={{
          height: 64,
          transform: "rotate(-90deg)",
          marginLeft: 6,
          marginTop: 6,
        }}
      />
    </div>
  );
};
