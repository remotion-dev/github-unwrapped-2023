import { Composition } from "remotion";
import {
  defaultMyCompProps,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { Spaceship } from "./Spaceship";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={"Spaceship"}
        component={Spaceship}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
    </>
  );
};
