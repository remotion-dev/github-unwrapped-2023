import { Composition, Folder, Still } from "remotion";
import { COMP_NAME, LanguagesEnum, compositionSchema } from "../src/config";
import {
  TOP_LANGUAGES_DURATION,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { Stars } from "../vite/Home/Stars";
import { ContributionsScene } from "./Contributions";
import { NativeGradient } from "./Gradients/NativeGradient";
import type { GradientType } from "./Gradients/available-gradients";
import { availableGradients } from "./Gradients/available-gradients";
import { Issues, issuesSchema } from "./Issues";
import { FPS } from "./Issues/make-ufo-positions";
import {
  JumpingNumberDemo,
  jumpingNumberSchema,
} from "./JumpingNumber/JumpingNumber";
import { LandingCut, planetSchema } from "./Landing";
import { Main, mainCalculateMetadataScene } from "./Main";
import { OpeningScene } from "./Opening";
import { PATHS_COMP_HEIGHT } from "./Paths/Path";
import { PullRequests } from "./Paths/Paths";
import { WholePaths } from "./Paths/WholePaths";
import { Poof } from "./Poof";
import { Productivity } from "./Productivity/Productivity";
import { Tablet } from "./Productivity/Tablet";
import { GRAPH_DATA } from "./Productivity/constants";
import {
  SevenSegment,
  sevenSegmentSchema,
} from "./SevenSegment/SevenSegmentNumber";
import { SponsorshipsScene } from "./Sponsorships";
import { STAR_DURATION, StarSprite } from "./StarSprite";
import { StarsAndProductivity } from "./StarsAndProductivity";
import {
  MAX_STARS,
  STAR_DELAY,
  StarsReceived,
  TIME_INBETWEEN_STARS,
  starsReceivedSchema,
} from "./StarsReceived";
import { DESCRIPTION_SEQUENCE_DURATION } from "./StarsReceived/Description";
import { TopLanguagesCanvas, topLanguagesSchema } from "./TopLanguages";
import {
  AllPlanets,
  allPlanetsSchema,
  getDurationOfAllPlanets,
} from "./TopLanguages/AllPlanets";
import { FloatingOctocat } from "./TopLanguages/FloatingOctocat";
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
import {
  TopLanguagesTitleCard,
  topLanguagesTitleCardSchema,
} from "./TopLanguages/TitleCard";
import { defaultMyCompProps } from "./props";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={"Opening"}
        component={OpeningScene}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id={"Sponsorships"}
        component={SponsorshipsScene}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      {/* <Composition
        id={"Landing"}
        component={LandingScene}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        schema={planetSchema}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ planetType: "Silver" as const }}
      /> */}
      <Composition
        id={"LandingCut"}
        component={LandingCut}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        schema={planetSchema}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ planetType: "Silver" as const }}
      />
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
          defaultProps={{ closedIssues: 3000, openIssues: 2000 }}
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
        defaultProps={{
          transitionDuration: 30,
          burstFrame: 30,
        }}
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
          starsGiven: 43,
          showBackground: true,
          showHitWindow: false,
          showCockpit: true,
          showDots: false,
          tabletTransition: 10,
        }}
        calculateMetadata={({ props }) => {
          const starsDisplayed = Math.min(props.starsGiven, MAX_STARS);
          return {
            durationInFrames:
              (starsDisplayed - 1) * TIME_INBETWEEN_STARS +
              STAR_DURATION +
              STAR_DELAY +
              DESCRIPTION_SEQUENCE_DURATION,
          };
        }}
      />
      <Composition
        id={"StarsAndProductivity"}
        component={StarsAndProductivity}
        durationInFrames={10 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={starsReceivedSchema}
        defaultProps={{
          starsGiven: 10,
          showBackground: true,
          showHitWindow: true,
          showCockpit: true,
          showDots: true,
        }}
        calculateMetadata={({ props }) => {
          const starsDisplayed = Math.min(props.starsGiven, MAX_STARS);
          return {
            durationInFrames:
              (starsDisplayed - 1) * TIME_INBETWEEN_STARS +
              STAR_DURATION +
              DESCRIPTION_SEQUENCE_DURATION +
              100,
          };
        }}
      />
      <Composition
        id={"Productivity"}
        component={Productivity}
        durationInFrames={10 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          graphData: GRAPH_DATA,
        }}
      />
      <Composition
        id={"Tablet"}
        component={Tablet}
        durationInFrames={10 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          graphData: GRAPH_DATA,
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
          id={"TopLanguagesTitleCard"}
          component={TopLanguagesTitleCard}
          durationInFrames={TOP_LANGUAGES_DURATION}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={topLanguagesTitleCardSchema}
          defaultProps={{
            login: "JonnyBurger",
          }}
        />
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
            enterDirection: "right-counter-clockwise" as const,
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
            showHelperLine: false,
            corner: "bottom-right",
            position: 1,
            startRotationInRadians: 0,
            clockDirection: "clockwise",
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
            corner: "bottom-right",
            position: 1,
          }}
        />
        <Composition
          id={"FloatingOctocat"}
          component={FloatingOctocat}
          durationInFrames={150}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
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
            corner: "top-right" as const,
            language1: "Python" as const,
            language2: "Go" as const,
            language3: "JavaScript" as const,
            showHelperLine: false,
            login: "JonnyBurger",
          }}
        />
      </Folder>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={60 * 30}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={compositionSchema}
        calculateMetadata={mainCalculateMetadataScene}
        defaultProps={{
          corner: "bottom-left",
          language1: "JavaScript",
          language2: "TypeScript",
          language3: "Rust2",
          showHelperLine: false,
          login: "JonnyBurger",
          planet: "Silver",
          starsGiven: 10,
          issuesClosed: 10,
          issuesOpened: 10,
          totalPullRequests: 10,
        }}
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
              component={NativeGradient}
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              defaultProps={{
                gradient: gradient as GradientType,
              }}
            />
          );
        })}
      </Folder>
    </>
  );
};
