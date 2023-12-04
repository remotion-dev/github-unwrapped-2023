import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { z } from "zod";
import type { Planet } from "../../src/config";
import { PlanetEnum, accentColorSchema, rocketSchema } from "../../src/config";
import { VIDEO_FPS } from "../../types/constants";
import { Gradient } from "../Gradients/NativeGradient";
import { accentColorToGradient } from "../Opening/TitleImage";
import { RocketSide } from "../Spaceship";
import { Background } from "./Background";
import Cloud1 from "./Cloud-1";
import Cloud2 from "./Cloud-2";
import Fire from "./Fire";
import { Smoke } from "./Smoke";
import Sparkle from "./Sparkle2";

export const planetSchema = z.object({
  planetType: PlanetEnum,
  accentColor: accentColorSchema,
  rocketType: rocketSchema,
});

const PLANET_SIZE = 1400;
const PLANET_GROWTH = 400;

const LANDING_FRAME = 115;

const SPARKLE_SPEED = 40;

const WITH_CLOUDS = true;

const SHOW_TEXT_LENGTH = 60;

const TEXT_1 = LANDING_FRAME - 15;
const TEXT_2 = TEXT_1 + SHOW_TEXT_LENGTH;
const TEXT_3 = TEXT_2 + SHOW_TEXT_LENGTH;

type PlanetAttributes = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
  };
  bgGradient: string;
  name: string;
  description: string;
  planet: string;
  style: React.CSSProperties;
  landingAdjustment: number;
  sparkles: {
    x: number;
    y: number;
  }[];
  bgBrightness: number;
  planetAdjustment: number;
  planetSize: number;
};

const mapPlanetToAttributes: { [key in Planet]: PlanetAttributes } = {
  [PlanetEnum.Values.Ice]: {
    colors: {
      color1: "#02e3f2",
      color2: "#42d9e3",
      color3: "#76dce3",
      color4: "#9ae7ed",
      color5: "#d9fcff",
    },
    bgBrightness: 900,
    sparkles: [
      {
        x: 180,
        y: 620,
      },
      {
        x: 800,
        y: 680,
      },
      {
        x: 800,
        y: 780,
      },
      {
        x: 380,
        y: 650,
      },
      {
        x: 280,
        y: 750,
      },
    ],
    bgGradient: "linear-gradient(#02e3f2, #59b2ff)",
    name: "Ice Planet",
    description:
      "The ice planet is the home of many ice creatures. You will adapt to the cold and become one of them.",
    planet: staticFile("planet-ice.png"),
    style: {},
    landingAdjustment: -90,
    planetAdjustment: 0,
    planetSize: 1,
  },
  [PlanetEnum.Values.Silver]: {
    colors: {
      color1: "#a8a8a8",
      color2: "#b8b8b8",
      color3: "#c7c7c7",
      color4: "#d9d9d9",
      color5: "#f2f2f2",
    },
    bgBrightness: 400,
    bgGradient: "linear-gradient( #404040, #a8a8a8)",
    planet: staticFile("planet-silver.png"),
    name: "Titanium Planet",
    description:
      "Impressive, this planet is a rare discovery. However, the glint of gold in the night sky leaves you with a restless curiousity.",
    style: {
      transform: "rotate(45deg)",
    },
    landingAdjustment: 0,
    sparkles: [],
    planetAdjustment: 0,
    planetSize: 1,
  },
  [PlanetEnum.Values.Gold]: {
    colors: {
      color1: "#cd9631",
      color2: "#cf9b36",
      color3: "#d7ab45",
      color4: "#e4c65d",
      color5: "#f5e87d",
    },
    bgBrightness: 500,
    bgGradient: "linear-gradient(#382f15, #000000)",
    name: "Golden Planet",
    description:
      "You have reached the pinnacle of space discovery. A warm fuzzy feeling and mounds of gold assure you that you have made the right choice.",
    planet: staticFile("gold-planet.svg"),
    style: {},
    landingAdjustment: 0,
    sparkles: [],
    planetAdjustment: 900,
    planetSize: 0.4,
  },
};

const CUTOVER = LANDING_FRAME - 60;

export const LandingScene: React.FC<z.infer<typeof planetSchema>> = ({
  planetType,
  accentColor,
  rocketType,
}) => {
  // const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const cloud = spring({
    fps: VIDEO_FPS,
    frame: frame / 4.5,
    config: {
      damping: 100,
    },
  });

  const cloudOffset = interpolate(cloud, [0, 1], [60, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cloudSize = interpolate(cloud, [0, 1], [1, 1.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const planet = spring({
    fps: VIDEO_FPS,
    frame: frame / 3,
    config: {
      damping: 200,
    },
  });

  const text1 = spring({
    fps: VIDEO_FPS,
    frame,
    delay: TEXT_1,
    config: {
      damping: 40,
    },
  });

  const text2 = spring({
    fps: VIDEO_FPS,
    frame,
    delay: TEXT_2,
    config: {
      damping: 40,
    },
  });

  const text3 = spring({
    fps: VIDEO_FPS,
    frame,
    delay: TEXT_3,
    config: {
      damping: 40,
    },
  });

  const rocket = spring({
    fps: VIDEO_FPS,
    frame: frame > CUTOVER ? frame / 7.5 : frame / 4.5,
    delay: 0,
    config: {
      damping: 100,
    },
  });

  const attributes = mapPlanetToAttributes[planetType];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
        }}
      >
        <AbsoluteFill>
          <Gradient gradient={accentColorToGradient(accentColor)} />
        </AbsoluteFill>
        <AbsoluteFill>
          <Background />
        </AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: attributes.bgGradient,
            opacity:
              frame < LANDING_FRAME
                ? frame / attributes.bgBrightness
                : LANDING_FRAME / attributes.bgBrightness,
          }}
        />

        {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Stars />
      </div> */}

        <div
          style={{
            width:
              PLANET_SIZE * attributes.planetSize -
              PLANET_GROWTH +
              planet * PLANET_GROWTH,
            position: "absolute",
            left:
              -(
                PLANET_SIZE * attributes.planetSize -
                PLANET_GROWTH +
                planet * PLANET_GROWTH
              ) /
                2 +
              530,
            bottom: -850 + planet * 120 + attributes.planetAdjustment,
          }}
        >
          <Img
            src={attributes.planet}
            style={{ width: "100%", height: "100%", ...attributes.style }}
          />

          {/* <Planet /> */}
        </div>

        {WITH_CLOUDS && (
          <div
            style={{
              width: 900 + 100 * cloud,
              position: "absolute",
              bottom: -450 + cloudOffset * 5.6,
              left: -150,
              transform: `scale(${cloudSize})`,
              opacity: ((1 - cloud) * 1 + 0.7) * 0.07,
            }}
          >
            <Cloud1 {...attributes.colors} />
          </div>
        )}

        {frame < LANDING_FRAME - 40 && (
          <div
            style={{
              position: "absolute",
              left: 352,
              top: -480 + rocket * 1150 - attributes.landingAdjustment,
              width: 400,
              transform: `scale(${1 - rocket + 0.2})`,
              transformOrigin: "center top",
            }}
          >
            <Fire />
          </div>
        )}

        <Smoke
          currentFrame={frame}
          startFrame={LANDING_FRAME + 40}
          x={520}
          y={640 - attributes.landingAdjustment}
          scale={5}
        />

        {frame < TEXT_2 && (
          <h1
            style={{
              top: 360,
              textAlign: "center",
              fontSize: 30,
              width: 460,

              fontFamily: "Mona Sans",
              color: "white",
              opacity: text1,
              left: 306,

              position: "absolute",
            }}
          >
            Which planet will you discover?
          </h1>
        )}

        {frame < TEXT_3 && (
          <h1
            style={{
              top: 360,
              textAlign: "center",
              fontSize: 30,
              width: 460,
              fontFamily: "Mona Sans",
              color: "white",
              opacity: text2,
              left: 306,
              position: "absolute",
            }}
          >
            Get your #GitHubUnwrapped
          </h1>
        )}

        <h1
          style={{
            top: 360,
            textAlign: "center",
            fontSize: 30,
            width: 460,

            fontFamily: "Mona Sans",
            color: "white",
            opacity: text3,
            left: 306,

            position: "absolute",
          }}
        >
          GitHubUnwrapped.com
        </h1>

        {/* <h2
        style={{
          fontSize: 32,
          fontFamily: "Mona Sans",
          color: "white",
          opacity: text,
          textAlign: "left",
          left: 96,
          top: 256,
          position: "absolute",
          width: 800,
          fontWeight: 400,
        }}
      >
        <span style={{ opacity: 0.8 }}>{attributes.description}</span>
      </h2> */}

        <div
          style={{
            position: "absolute",
            left: 410,
            top: -700 + rocket * 1100 - attributes.landingAdjustment,
            width: 300,

            transform: `scale(${1 - rocket + 0.6})`,
            // transformOrigin: "center center",
          }}
        >
          <RocketSide rocket={rocketType} />
        </div>

        {WITH_CLOUDS && (
          <div
            style={{
              width: 1000 + 100 * cloud,
              position: "absolute",
              bottom: -400 + cloudOffset * 3.8,
              right: -200,
              transform: `scale(${cloudSize})`,
              opacity: ((1 - cloud) * 1 + 0.7) * 0.07,
            }}
          >
            <Cloud2 {...attributes.colors} />
          </div>
        )}

        {frame > LANDING_FRAME - 45 &&
          attributes.sparkles.map(
            (i: { x: number; y: number }, index: number) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={{
                  position: "absolute",
                  top: i.y,
                  left: i.x,
                  width: 100,
                  opacity: 0.8,
                  height: 100,
                  transform: `scale(${
                    (SPARKLE_SPEED / 4 -
                      ((frame + 3 * index) % SPARKLE_SPEED)) /
                    (SPARKLE_SPEED / 4)
                  })`,
                }}
              >
                <Sparkle />
              </div>
            ),
          )}

        {/* <div
        style={{ width: 1600, position: "absolute", top: -720, right: -544 }}
      >
        <Swish />
      </div> */}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const LandingCut: React.FC<z.infer<typeof planetSchema>> = ({
  accentColor,
  planetType,
  rocketType,
}) => {
  return (
    <Sequence>
      <Sequence durationInFrames={CUTOVER}>
        <LandingScene
          rocketType={rocketType}
          accentColor={accentColor}
          planetType={planetType}
        />
      </Sequence>
      <Sequence
        style={{
          top: -64,
          scale: String(2),
        }}
        from={CUTOVER - 1}
      >
        <Sequence from={-CUTOVER - 1}>
          <LandingScene
            rocketType={rocketType}
            accentColor={accentColor}
            planetType={PlanetEnum.Values.Ice}
          />
        </Sequence>
      </Sequence>
    </Sequence>
  );
};
