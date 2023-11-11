import { Composition, Folder } from "remotion";
import {
  defaultMyCompProps,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { Issues, issuesSchema } from "./Issues";
import {
  JumpingNumberDemo,
  jumpingNumberSchema,
} from "./JumpingNumber/JumpingNumber";
import { Planet } from "./Planet";
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
      <Folder name="Issues">
        <Composition
          id={"Issues2-0"}
          component={Issues}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={issuesSchema}
          defaultProps={{ closedIssues: 2, openIssues: 0 }}
        />
        <Composition
          id={"Issues20-15"}
          component={Issues}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={issuesSchema}
          defaultProps={{ closedIssues: 20, openIssues: 15 }}
        />
        <Composition
          id={"Issues80-20"}
          component={Issues}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={issuesSchema}
          defaultProps={{ closedIssues: 80, openIssues: 20 }}
        />
      </Folder>
      <Composition
        id={"TopLanguages"}
        component={TopLanguages}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
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
        id={"JavaPlanet"}
        component={Planet}
        durationInFrames={40}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};
