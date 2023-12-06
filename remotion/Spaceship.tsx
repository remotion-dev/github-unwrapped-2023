import { AbsoluteFill, Img, staticFile } from "remotion";
import type { Rocket } from "../src/config";

export const getSideRocketSource = (rocket: Rocket) => {
  if (rocket === "blue") {
    return staticFile("rocket-side-blue.png");
  }

  if (rocket === "orange") {
    return staticFile("rocket-side-orange.png");
  }

  return staticFile("rocket-side-yellow.png");
};

export const RocketSide = (props: { rocket: Rocket }) => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Img
      src={getSideRocketSource(props.rocket)}
      style={{
        width: 732 / 2,
        height: 1574 / 2,
      }}
    />
  </AbsoluteFill>
);
