import { Composition, Folder, Still } from "remotion";
import {
  TOP_LANGUAGES_DURATION,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  defaultMyCompProps,
} from "../types/constants";
import { Stars } from "../vite/Home/Stars";
import { ContributionsScene } from "./Contributions";
import { Gradient } from "./Gradients/NativeGradient";
import { availableGradients } from "./Gradients/available-gradients";
import { Issues, issuesSchema } from "./Issues";
import { FPS } from "./Issues/make-ufo-positions";
import {
  JumpingNumberDemo,
  jumpingNumberSchema,
} from "./JumpingNumber/JumpingNumber";
import { Main } from "./Main";
import { PATHS_COMP_HEIGHT } from "./Paths/Path";
import { PullRequests } from "./Paths/Paths";
import { WholePaths } from "./Paths/WholePaths";
import { Poof } from "./Poof";
import {
  SevenSegment,
  sevenSegmentSchema,
} from "./SevenSegment/SevenSegmentNumber";
import { StarSprite } from "./StarSprite";
import { StarsReceived, starsReceivedSchema } from "./StarsReceived";
import {
  TopLanguagesCamera,
  TopLanguagesCanvas,
  topLanguagesSchema,
} from "./TopLanguages";
import {
  AllPlanets,
  allPlanetsSchema,
  getDurationOfAllPlanets,
} from "./TopLanguages/AllPlanets";
import {
  PlanetScaleWiggle,
  wiggleSchema,
} from "./TopLanguages/PlaneScaleWiggle";
import { PlanetScaleOut, zoomOutSchema } from "./TopLanguages/PlanetScaleOut";
import {
  PlanetScaleSpiral,
  spiralSchema,
} from "./TopLanguages/PlanetScaleSpiral";
import { PlanetScaleSpiralWhole } from "./TopLanguages/PlanetScaleSpiralWhole";
import { LanguagesEnum } from "./TopLanguages/constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={"Contributions"}
        component={ContributionsScene}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />

      <Folder name="Issues">
        <Composition
          id={"Issues0-0"}
          component={Issues}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={issuesSchema}
          defaultProps={{ closedIssues: 0, openIssues: 0 }}
        />
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
        <Composition
          id={"Issues500-500"}
          component={Issues}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={issuesSchema}
          defaultProps={{ closedIssues: 100, openIssues: 900 }}
        />
      </Folder>
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
        id={"StarSprite"}
        component={StarSprite}
        durationInFrames={40}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id={"StarsReceived"}
        component={StarsReceived}
        durationInFrames={10 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={starsReceivedSchema}
        defaultProps={{
          starsReceived: 5,
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
        id={"SevenSegment"}
        component={SevenSegment}
        durationInFrames={40}
        fps={VIDEO_FPS}
        schema={sevenSegmentSchema}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ num: 15, fontSize: 100, max: null }}
      />
      <Folder name="Paths">
        <Composition
          id="WholePaths"
          component={WholePaths}
          fps={30}
          durationInFrames={250}
          height={PATHS_COMP_HEIGHT}
          width={1080}
          defaultProps={{
            extraPaths: 8,
          }}
        />
        <Composition
          id="Paths"
          component={PullRequests}
          fps={30}
          durationInFrames={240}
          height={1080}
          width={1080}
        />
      </Folder>
      <Folder name="TopLanguages">
        <Composition
          id={"TopLanguagesCanvas"}
          component={TopLanguagesCanvas}
          schema={topLanguagesSchema}
          durationInFrames={TOP_LANGUAGES_DURATION}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH * 2}
          height={VIDEO_HEIGHT * 2}
          defaultProps={{
            first: LanguagesEnum.enum.JavaScript,
            second: LanguagesEnum.enum.Python,
            third: LanguagesEnum.enum.Java,
          }}
        />
        <Composition
          id={"TopLanguagesCamera"}
          component={TopLanguagesCamera}
          schema={topLanguagesSchema}
          durationInFrames={TOP_LANGUAGES_DURATION}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            first: "Java" as const,
            second: "Python" as const,
            third: "Java" as const,
          }}
        />
        <Composition
          id={"TopLanguagesZoomOut"}
          component={PlanetScaleOut}
          durationInFrames={150}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={zoomOutSchema}
          defaultProps={{
            corner: "top-right" as const,
            language: "JavaScript" as const,
            position: 1,
          }}
        />
        <Composition
          id={"TopLanguagesWiggle"}
          component={PlanetScaleWiggle}
          schema={wiggleSchema}
          durationInFrames={150}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            language: "Java",
            position: 1,
          }}
        />
        <Composition
          id={"PlanetSpiralWhole"}
          component={PlanetScaleSpiralWhole}
          schema={spiralSchema}
          durationInFrames={150}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            language: "Java" as const,
            showHelperLine: true,
            startRotationInRadians: 0,
            position: 1,
          }}
        />
        <Composition
          id={"TopLanguagesSpiral"}
          component={PlanetScaleSpiral}
          schema={spiralSchema}
          durationInFrames={150}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            language: "Java" as const,
            showHelperLine: false,
            startRotationInRadians: 37.3,
            position: 1,
          }}
        />
        <Composition
          id={"AllPlanets"}
          component={AllPlanets}
          schema={allPlanetsSchema}
          durationInFrames={500}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          calculateMetadata={({ props: { language2, language3 } }) => {
            return {
              durationInFrames: getDurationOfAllPlanets({
                language2,
                language3,
                fps: VIDEO_FPS,
              }),
            };
          }}
          defaultProps={{
            corner: "bottom-left",
            language1: "Java",
            language2: "JavaScript",
            language3: "Python",
            showHelperLine: false,
            startRotationInRadians: 0,
          }}
        />
      </Folder>
      <Composition
        id="Main"
        component={Main}
        durationInFrames={60 * 30}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="Stars"
        component={Stars}
        durationInFrames={10 * 30}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Folder name="Gradients">
        {Object.keys(availableGradients).map((gradient) => {
          return (
            <Still
              key={gradient}
              id={`Gradients-${gradient}`}
              component={Gradient}
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              defaultProps={{
                gradient: gradient as keyof typeof availableGradients,
              }}
            />
          );
        })}
      </Folder>
    </>
  );
};
