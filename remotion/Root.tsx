import { Composition, Folder, Still } from "remotion";
import { LanguagesEnum, compositionSchema, ogImageSchema } from "../src/config";
import { SAMPLE_STARRED_REPOS } from "../src/server/random-sample-repos";
import {
  TOP_LANGUAGES_DURATION,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { Stars } from "../vite/Home/Stars";
import { ContributionsScene } from "./Contributions";
import { jonnysContributions } from "./Contributions/jonnys-contributions";
import { END_SCENE_DURATION, EndScene, endSceneSchema } from "./EndScene";
import { CallToAction } from "./EndScene/CallToAction";
import { NativeGradient } from "./Gradients/NativeGradient";
import type { GradientType } from "./Gradients/available-gradients";
import { availableGradients } from "./Gradients/available-gradients";
import { Issues, calculateIssueDuration, issuesSchema } from "./Issues";
import { FPS } from "./Issues/make-ufo-positions";
import { Main, mainCalculateMetadataScene } from "./Main";
import { Noise, noiseSchema } from "./Noise";
import { OgImage } from "./OgImage";
import { OPENING_SCENE_LENGTH, OpeningScene } from "./Opening";
import { OpeningTitle } from "./Opening/Title";
import { openingTitleSchema } from "./Opening/TitleImage";
import { Poof } from "./Poof";
import { Productivity } from "./Productivity/Productivity";
import { Tablet, tableSchema } from "./Productivity/Tablet";
import { TopDay, topDaySchema } from "./Productivity/TopDay";
import { Wheel } from "./Productivity/Wheel";
import { GRAPH_DATA } from "./Productivity/constants";
import { PromoVideo } from "./PromoVideo";
import { Planets } from "./PromoVideo/Planets";
import { PATHS_COMP_HEIGHT } from "./PullRequests/Path";
import {
  PULL_REQUESTS_DURATION,
  PullRequests,
  pullRequestsSchema,
} from "./PullRequests/PullRequests";
import { WholePaths } from "./PullRequests/WholePaths";
import {
  SevenSegment,
  sevenSegmentSchema,
} from "./SevenSegment/SevenSegmentNumber";
import { SponsorshipsScene } from "./Sponsorships";
import { StarSprite } from "./StarSprite";
import {
  StarsAndProductivity,
  starsAndProductivityCalculateMetadata,
} from "./StarsAndProductivity";
import {
  StarsGiven,
  starsGivenCalculateMetadata,
  starsGivenSchema,
} from "./StarsGiven";
import { Shine, Shines, shineSchema } from "./StarsGiven/Shines";
import { TopLanguagesCanvas, topLanguagesSchema } from "./TopLanguages";
import {
  AllPlanets,
  FIRST_PLACE_DURATION,
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

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="EndScene">
        <Composition
          id={"EndScene"}
          component={EndScene}
          durationInFrames={END_SCENE_DURATION}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={endSceneSchema}
          defaultProps={{
            accentColor: "blue",
            rocket: "blue",
            planet: "Ice",
          }}
        />
        <Composition
          id="CallToAction"
          component={CallToAction}
          durationInFrames={12 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            enterProgress: 1,
            exitProgress: 1,
            planet: "Ice",
          }}
        />
      </Folder>
      <Composition
        id={"Opening"}
        component={OpeningScene}
        durationInFrames={OPENING_SCENE_LENGTH}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={openingTitleSchema}
        defaultProps={{
          login: "JonnyBurger",
          startAngle: "left",
          accentColor: "blue",
          rocket: "blue",
        }}
      />
      <Composition
        id={"OpeningTitle"}
        component={OpeningTitle}
        durationInFrames={OPENING_SCENE_LENGTH}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          login: "JonnyBurger",
          exitProgress: 0,
          startAngle: "left",
          accentColor: "blue",
          rocket: "blue",
        }}
      />
      <Composition
        id={"Sponsorships"}
        component={SponsorshipsScene}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          accentColor: "blue",
        }}
      />
      <Composition
        id={"ContributionsScene2"}
        component={ContributionsScene}
        durationInFrames={END_SCENE_DURATION}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          total: 300,
          rocket: "blue",
          planet: "Ice",
          accentColor: "blue",
          contributionData: jonnysContributions,
        }}
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
          calculateMetadata={calculateIssueDuration}
          defaultProps={{ closedIssues: 0, openIssues: 0, rocket: "orange" }}
        />
        <Composition
          id={"Issues2-0"}
          component={Issues}
          durationInFrames={19 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={issuesSchema}
          calculateMetadata={calculateIssueDuration}
          defaultProps={{ closedIssues: 2, openIssues: 0, rocket: "blue" }}
        />
        <Composition
          id={"Issues20-15"}
          component={Issues}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={issuesSchema}
          calculateMetadata={calculateIssueDuration}
          defaultProps={{ closedIssues: 20, openIssues: 15, rocket: "orange" }}
        />
        <Composition
          id={"Issues80-20"}
          component={Issues}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={issuesSchema}
          calculateMetadata={calculateIssueDuration}
          defaultProps={{ closedIssues: 80, openIssues: 20, rocket: "yellow" }}
        />
        <Composition
          id={"Issues500-500"}
          component={Issues}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={issuesSchema}
          calculateMetadata={calculateIssueDuration}
          defaultProps={{
            closedIssues: 3000,
            openIssues: 2000,
            rocket: "blue",
          }}
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
        calculateMetadata={calculateIssueDuration}
        defaultProps={{ closedIssues: 75, openIssues: 0, rocket: "blue" }}
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
        id={"StarsAndProductivity"}
        component={StarsAndProductivity}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={starsGivenSchema}
        defaultProps={{
          starsGiven: 10,
          showCockpit: true,
          topWeekday: "3",
          topHour: "0",
          graphData: GRAPH_DATA,
          accentColor: "blue",
          totalPullRequests: 614,
          login: "JonnyBurger",
          sampleStarredRepos: SAMPLE_STARRED_REPOS,
        }}
        calculateMetadata={starsAndProductivityCalculateMetadata}
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
          weekday: "4",
          hour: "4",
        }}
      />
      <Composition
        id="Wheel"
        component={Wheel}
        durationInFrames={100}
        fps={FPS}
        height={500}
        width={500}
        schema={topDaySchema}
        defaultProps={{
          value: "6",
          values: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          radius: 90,
          label: "Most productive day",
          renderLabel: (value) => value,
          delay: 30,
          soundDelay: 60,
        }}
      />
      <Composition
        id="TopDay"
        component={TopDay}
        durationInFrames={100}
        fps={FPS}
        height={200}
        width={1080}
        schema={topDaySchema}
        defaultProps={{
          value: "1",
          values: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          label: "Most productive day",
          radius: 90,
          renderLabel: (value) => value,
          delay: 30,
          soundDelay: 60,
        }}
      />
      <Composition
        id={"Tablet"}
        component={Tablet}
        durationInFrames={10 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={tableSchema}
        defaultProps={{
          graphData: GRAPH_DATA,
          enterProgress: 0,
          weekday: "6",
          hour: "0",
        }}
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
      <Folder name="PullRequests">
        <Composition
          id="WholePaths"
          component={WholePaths}
          fps={30}
          durationInFrames={250}
          height={PATHS_COMP_HEIGHT}
          width={1080}
          defaultProps={{
            extraPaths: 8,
            initialPullRequests: 0,
          }}
        />
        <Composition
          id="PullRequests"
          component={PullRequests}
          fps={30}
          durationInFrames={PULL_REQUESTS_DURATION}
          height={1080}
          width={1080}
          schema={pullRequestsSchema}
          defaultProps={{
            totalPullRequests: 614,
            accentColor: "purple",
          }}
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
            randomizePlanetSeed: "randomizePlanetSeed",
            pluralizeLanguages: false,
            accentColor: "blue",
            rocket: "blue",
            randomizeOctocatSeed: 0.4,
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
            rocket: "orange",
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
            language: { type: "designed" as const, name: "JavaScript" },
            position: 1,
            rocket: "orange",
          }}
        />
        <Composition
          id="TopLanguagesWiggle"
          component={PlanetScaleWiggle}
          schema={wiggleSchema}
          durationInFrames={FIRST_PLACE_DURATION}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            rocket: "blue",
            position: 1,
            language: { type: "other", name: "Scala", color: "#C22D40" },
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
            language: { type: "designed" as const, name: "Java" as const },
            showHelperLine: false,
            corner: "bottom-right",
            position: 1,
            startRotationInRadians: 0,
            clockDirection: "clockwise",
            rocket: "blue",
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
            language: { type: "designed", name: "Java" },
            showHelperLine: false,
            corner: "bottom-right",
            position: 1,
            rocket: "orange",
          }}
        />
        <Composition
          id={"FloatingOctocat"}
          component={FloatingOctocat}
          durationInFrames={150}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            accentColor: "blue",
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
          calculateMetadata={({ props: { topLanguages } }) => {
            return {
              durationInFrames: getDurationOfAllPlanets({
                topLanguages,
                fps: VIDEO_FPS,
              }),
            };
          }}
          defaultProps={{
            corner: "top-right" as const,
            topLanguages: {
              language1: { type: "designed" as const, name: "C++" as const },
              language2: { type: "designed" as const, name: "Go" as const },
              language3: { type: "designed" as const, name: "Ruby" as const },
            },
            showHelperLine: false,
            login: "JonnyBurger",
            accentColor: "blue",
            rocket: "blue",
            octocatSeed: 0.4,
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
        schema={compositionSchema}
        calculateMetadata={mainCalculateMetadataScene}
        defaultProps={{
          totalContributions: 4000,
          corner: "bottom-left" as const,
          topLanguages: {
            language1: {
              type: "designed" as const,
              name: "JavaScript" as const,
            },
            language2: {
              type: "designed" as const,
              name: "TypeScript" as const,
            },
            language3: { type: "designed" as const, name: "Nix" as const },
          },
          showHelperLine: false,
          login: "iampato",
          planet: "Silver" as const,
          starsGiven: 50,
          issuesClosed: 200,
          issuesOpened: 200,
          totalPullRequests: 8,
          topWeekday: "2" as const,
          topHour: "4" as const,
          graphData: [
            { productivity: 0, time: 0 },
            { productivity: 0, time: 1 },
            { productivity: 0, time: 2 },
            { productivity: 0, time: 3 },
            { productivity: 0, time: 4 },
            { productivity: 0, time: 5 },
            { productivity: 0, time: 6 },
            { productivity: 5, time: 7 },
            { productivity: 29, time: 8 },
            { productivity: 49, time: 9 },
            { productivity: 58, time: 10 },
            { productivity: 49, time: 11 },
            { productivity: 17, time: 12 },
            { productivity: 48, time: 13 },
            { productivity: 43, time: 14 },
            { productivity: 54, time: 15 },
            { productivity: 33, time: 16 },
            { productivity: 52, time: 17 },
            { productivity: 35, time: 18 },
            { productivity: 12, time: 19 },
            { productivity: 9, time: 20 },
            { productivity: 5, time: 21 },
            { productivity: 2, time: 22 },
            { productivity: 0, time: 23 },
          ],
          openingSceneStartAngle: "left" as const,
          accentColor: "blue" as const,
          rocket: "blue" as const,
          contributionData: jonnysContributions,
          sampleStarredRepos: [
            "remotion",
            "React-native-skia",
            "argo",
            "argo-checkout",
            "argo-admin",
            "argo-checkout",
            "argo-admin",
            "argo-checkout",
            "argo-admin",
            "argo-checkout",
          ],
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
      <Composition
        id="Noise"
        component={Noise}
        durationInFrames={10 * 30}
        fps={FPS}
        schema={noiseSchema}
        defaultProps={{
          translateX: 0,
          translateY: 0,
        }}
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
      <Folder name="StarsGiven">
        <Composition
          id="shine"
          component={Shine}
          fps={30}
          durationInFrames={100}
          height={1080}
          width={1080}
          schema={shineSchema}
          defaultProps={{
            rotation: 0.1,
            showHelpers: false,
          }}
        />
        <Composition
          id="shines"
          component={Shines}
          fps={30}
          durationInFrames={100}
          height={1080}
          width={1080}
          defaultProps={{
            rotationShake: 0,
            xShake: 0,
            yShake: 0,
          }}
        />
        <Composition
          id={"StarsGiven0"}
          component={StarsGiven}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={starsGivenSchema}
          defaultProps={{
            timeUntilTabletHides: 200,
            starsGiven: 9,
            showCockpit: true,
            topWeekday: "1" as const,
            topHour: "0" as const,
            graphData: [
              { productivity: 0, time: 0 },
              { productivity: 0, time: 1 },
              { productivity: 0, time: 2 },
              { productivity: 0, time: 3 },
              { productivity: 0, time: 4 },
              { productivity: 0, time: 5 },
              { productivity: 0, time: 6 },
              { productivity: 5, time: 7 },
              { productivity: 29, time: 8 },
              { productivity: 49, time: 9 },
              { productivity: 58, time: 10 },
              { productivity: 49, time: 11 },
              { productivity: 17, time: 12 },
              { productivity: 48, time: 13 },
              { productivity: 43, time: 14 },
              { productivity: 54, time: 15 },
              { productivity: 33, time: 16 },
              { productivity: 52, time: 17 },
              { productivity: 35, time: 18 },
              { productivity: 12, time: 19 },
              { productivity: 9, time: 20 },
              { productivity: 5, time: 21 },
              { productivity: 2, time: 22 },
              { productivity: 0, time: 23 },
            ],
            accentColor: "purple" as const,
            totalPullRequests: 614,
            login: "JonnyBurger",
            sampleStarredRepos: [
              "remotion-dev/remotion",
              "Shopify/React-native-skia",
              "Shopify/argo",
              "Shopify/argo-checkout",
              "Shopify/argo-admin",
              "Shopify/argo-checkout",
              "Shopify/argo-admin",
              "Shopify/argo-checkout",
              "Shopify/argo-admin",
              "Shopify/argo-checkout",
            ],
            timeUntilTabletHasEntered: 200,
          }}
          calculateMetadata={starsGivenCalculateMetadata}
        />
        <Composition
          id={"StarsGiven5"}
          component={StarsGiven}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={starsGivenSchema}
          defaultProps={{
            starsGiven: 504,
            showCockpit: true,
            topWeekday: "1" as const,
            topHour: "0" as const,
            graphData: [
              { productivity: 0, time: 0 },
              { productivity: 0, time: 1 },
              { productivity: 0, time: 2 },
              { productivity: 0, time: 3 },
              { productivity: 0, time: 4 },
              { productivity: 0, time: 5 },
              { productivity: 0, time: 6 },
              { productivity: 5, time: 7 },
              { productivity: 29, time: 8 },
              { productivity: 49, time: 9 },
              { productivity: 58, time: 10 },
              { productivity: 49, time: 11 },
              { productivity: 17, time: 12 },
              { productivity: 48, time: 13 },
              { productivity: 43, time: 14 },
              { productivity: 54, time: 15 },
              { productivity: 33, time: 16 },
              { productivity: 52, time: 17 },
              { productivity: 35, time: 18 },
              { productivity: 12, time: 19 },
              { productivity: 9, time: 20 },
              { productivity: 5, time: 21 },
              { productivity: 2, time: 22 },
              { productivity: 0, time: 23 },
            ],
            accentColor: "purple" as const,
            totalPullRequests: 614,
            login: "JonnyBurger",
            sampleStarredRepos: [
              "remotion-dev/remotion",
              "Shopify/React-native-skia",
              "Shopify/argo",
              "Shopify/argo-checkout",
              "Shopify/argo-admin",
              "Shopify/argo-checkout",
              "Shopify/argo-admin",
              "Shopify/argo-checkout",
              "Shopify/argo-admin",
              "Shopify/argo-checkout",
            ],
            timeUntilTabletHasEntered: 200,
            timeUntilTabletHides: 200,
          }}
          calculateMetadata={starsGivenCalculateMetadata}
        />
        <Composition
          id={"StarsGiven50"}
          component={StarsGiven}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={starsGivenSchema}
          defaultProps={{
            timeUntilTabletHides: 200,
            starsGiven: 50,
            showCockpit: true,
            topWeekday: "1" as const,
            topHour: "0" as const,
            graphData: GRAPH_DATA,
            accentColor: "purple" as const,
            totalPullRequests: 614,
            login: "JonnyBurger",
            sampleStarredRepos: SAMPLE_STARRED_REPOS,
            timeUntilTabletHasEntered: 200,
          }}
          calculateMetadata={starsGivenCalculateMetadata}
        />
      </Folder>
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        width={1200}
        height={630}
        durationInFrames={20 * 30}
        fps={30}
      />
      <Composition
        id="PlanetPromo"
        component={Planets}
        width={1200}
        height={630}
        durationInFrames={20 * 30}
        fps={30}
      />
      <Folder name="Stills">
        <Still
          width={1200}
          height={630}
          component={OgImage}
          id="og-image"
          schema={ogImageSchema}
          defaultProps={{
            topLanguage: {
              type: "designed",
              name: "PHP",
            },
            issues: 10,
            login: "JonnyBurger",
            pullRequests: 10,
            stars: 10,
            weekdays: [100, 200, 1, 0, 3, 400, 100],
            contributionData: [
              34, 0, 35, 57, 67, 57, 126, 0, 97, 39, 0, 0, 46, 0, 114, 0, 82,
              72, 95, 63, 92, 32, 0, 57, 109, 0, 98, 69, 44, 58, 99, 0, 107, 75,
              104, 97, 100, 125, 38, 122, 55, 102, 77, 70, 0, 47, 47, 56, 58,
              49, 0, 86, 66, 75, 0, 36, 36, 71, 98, 93, 113, 0, 126, 51, 0, 0,
              0, 0, 63, 36, 37, 55, 0, 69, 53, 0, 98, 56, 50, 0, 52, 75, 0, 65,
              0, 37, 0, 0, 37, 98, 0, 60, 0, 34, 124, 119, 69, 70, 60, 0, 125,
              0, 90, 99, 49, 36, 104, 43, 67, 0, 126, 112, 69, 113, 82, 106, 58,
              74, 122, 0, 119, 111, 0, 35, 46, 40, 120, 0, 101, 125, 86, 56, 69,
              100, 0, 94, 107, 108, 70, 56, 33, 0, 0, 87, 36, 68, 112, 39, 114,
              122, 72, 45, 124, 46, 77, 0, 126, 0, 0, 0, 48, 75, 124, 74, 97,
              105, 0, 77, 0, 54, 34, 72, 41, 74, 34, 81, 107, 104, 0, 47, 0, 42,
              60, 0, 108, 59, 97, 124, 117, 78, 42, 0, 112, 108, 103, 117, 100,
              0, 90, 35, 55, 96, 52, 0, 0, 57, 113, 100, 78, 0, 0, 0, 103, 71,
              0, 116, 105, 61, 60, 111, 104, 0, 66, 75, 65, 76, 37, 42, 0, 0,
              85, 76, 80, 99, 95, 0, 0, 59, 0, 108, 88, 74, 62, 109, 44, 0, 0,
              104, 94, 108, 124, 70, 0, 88, 0, 102, 58, 73, 86, 0, 45, 98, 94,
              84, 53, 0, 34, 76, 0, 122, 61, 80, 40, 105, 81, 88, 45, 108, 92,
              90, 64, 56, 85, 70, 62, 45, 71, 33, 98, 0, 103, 68, 120, 38, 55,
              0, 40, 0, 47, 0, 78, 94, 0, 42, 60, 57, 107, 46, 76, 80, 0, 119,
              0, 121, 43, 0, 116, 47, 0, 87, 82, 105, 0, 126, 38, 102, 75, 89,
              67, 109, 121, 70, 103, 116, 0, 33, 54, 66, 0, 36, 69, 124, 0, 0,
              83, 0, 0, 127, 127, 0, 0, 54, 93, 91, 0, 38, 54, 72, 0, 39, 58,
              82, 98, 127,
            ],
          }}
        />
      </Folder>
    </>
  );
};
