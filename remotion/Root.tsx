import { Composition } from "remotion";
import {
  defaultMyCompProps,
  TOP_LANGUAGES_DURATION,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { Issues, issuesSchema } from "./Issues";
import {
  JumpingNumberDemo,
  jumpingNumberSchema,
} from "./JumpingNumber/JumpingNumber";
import { Poof } from "./Poof";
import { Spaceship } from "./Spaceship";
import { TopLanguages } from "./TopLanguages";

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
      <Composition
        id={"Issues"}
        component={Issues}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={issuesSchema}
        defaultProps={{ closedIssues: 75, openIssues: 0 }}
      />
      {/* <Composition
        id={"TopLanguages"}
        component={TopLanguages}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      /> */}
      <Composition
        id={"Poof"}
        component={Poof}
        durationInFrames={40}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          ufoScale: 1,
          x: 0,
          y: 0,
        }}
      />
      <Composition
        id={"JumpingNumber"}
        schema={jumpingNumberSchema}
        component={JumpingNumberDemo}
        durationInFrames={60}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.duration + 30,
            props,
          };
        }}
        defaultProps={{ duration: 73, from: 41, to: 70 }}
      />
      <Composition
        id={"TopLanguages"}
        component={TopLanguages}
        durationInFrames={TOP_LANGUAGES_DURATION}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH * 2}
        height={VIDEO_HEIGHT * 2}
      />
    </>
  );
};
