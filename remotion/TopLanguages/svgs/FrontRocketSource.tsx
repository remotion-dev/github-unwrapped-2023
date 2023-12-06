import React from "react";
import { Img, staticFile } from "remotion";
import type { Rocket } from "../../../src/config";

const ROCKET_SCALE = 0.15;
export const TL_ROCKET_WIDTH = 690 * ROCKET_SCALE;
export const TL_ROCKET_HEIGHT = 1578 * ROCKET_SCALE;

export const getFrontRocketSource = (rocket: Rocket) => {
  if (rocket === "blue") {
    return staticFile("rocket-front-blue.png");
  }

  if (rocket === "orange") {
    return staticFile("rocket-front-orange.png");
  }

  if (rocket === "yellow") {
    return staticFile("rocket-front-yellow.png");
  }

  throw new Error("Invalid rocket");
};

export const RocketFront = (props: {
  style?: React.CSSProperties;
  rocket: Rocket;
}) => (
  <Img
    src={getFrontRocketSource(props.rocket)}
    width={TL_ROCKET_WIDTH}
    height={TL_ROCKET_HEIGHT}
    {...props}
  />
);
