import { AbsoluteFill, Img } from "remotion";
import type { Rocket } from "../../src/config";
import { getSideRocketSource } from "../Spaceship";

const SvgComponent = (props: { rocket: Rocket }) => (
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

export default SvgComponent;
