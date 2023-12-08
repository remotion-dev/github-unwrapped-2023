import React from "react";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { z } from "zod";
import type { Planet } from "../../src/config";
import { PlanetEnum, accentColorSchema, rocketSchema } from "../../src/config";
import { VIDEO_FPS } from "../../types/constants";
import { GOLD_PLANET_ASSET, GOLD_PLANET_BG, GOLD_PLANET_SOUND } from "../End";
import { Gradient } from "../Gradients/NativeGradient";
import { getFlame } from "../Opening/TakeOff";
import { accentColorToGradient } from "../Opening/TitleImage";
import { RocketSide } from "../Spaceship";
import { Background } from "./Background";
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

const SILVER_PLANET_ASSET = staticFile("planet-silver.png");
const ICE_PLANET_ASSET = staticFile("planet-ice.png");

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
    planet: ICE_PLANET_ASSET,
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
    planet: SILVER_PLANET_ASSET,
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
    planet: GOLD_PLANET_ASSET,
    style: {},
    landingAdjustment: 0,
    sparkles: [],
    planetAdjustment: 900,
    planetSize: 0.4,
  },
};

export const getLandingAssetsToPrefetch = ({
  planetType,
}: {
  planetType: Planet;
}) => {
  if (planetType === PlanetEnum.Values.Gold) {
    return [GOLD_PLANET_ASSET, GOLD_PLANET_BG, GOLD_PLANET_SOUND];
  }

  return [mapPlanetToAttributes[planetType].planet];
};

const CUTOVER = LANDING_FRAME - 60;

export const LandingScene: React.FC<z.infer<typeof planetSchema>> = ({
  planetType,
  accentColor,
  rocketType,
}) => {
  const frame = useCurrentFrame();

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

  const rocketAnim = spring({
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
        </div>

        <div style={{}}>
          <OffthreadVideo src={getFlame(rocketType)} />
        </div>

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

        <div
          style={{
            position: "absolute",
            left: 410,
            top: -700 + rocketAnim * 1100 - attributes.landingAdjustment,
            width: 300,

            transform: `scale(${1 - rocketAnim + 0.6})`,
          }}
        >
          <RocketSide rocket={rocketType} />
        </div>

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
            planetType={planetType}
          />
        </Sequence>
      </Sequence>
    </Sequence>
  );
};
