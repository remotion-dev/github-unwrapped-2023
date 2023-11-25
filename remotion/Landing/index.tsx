import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { z } from "zod";
import type { Planet } from "../../src/config";
import { planetEnum } from "../../src/config";
import { VIDEO_FPS } from "../../types/constants";
import { Background } from "./Background";
import Cloud1 from "./Cloud-1";
import Cloud2 from "./Cloud-2";
import Fire from "./Fire";
import Rocket from "./Rocket";
import { Smoke } from "./Smoke";
import Sparkle from "./Sparkle2";
import Stars from "./Stars";

export const planetSchema = z.object({
  planetType: planetEnum,
});

const PLANET_SIZE = 1400;
const PLANET_GROWTH = 400;

const LANDING_FRAME = 115;

const SPARKLE_SPEED = 40;

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
};

const mapPlanetToAttributes: { [key in Planet]: PlanetAttributes } = {
  [planetEnum.Values.Ice]: {
    colors: {
      color1: "#02e3f2",
      color2: "#42d9e3",
      color3: "#76dce3",
      color4: "#9ae7ed",
      color5: "#d9fcff",
    },
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
  },
  [planetEnum.Values.Silver]: {
    colors: {
      color1: "#a8a8a8",
      color2: "#b8b8b8",
      color3: "#c7c7c7",
      color4: "#d9d9d9",
      color5: "#f2f2f2",
    },
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
  },
  [planetEnum.Values.Gold]: {
    colors: {
      color1: "#cd9631",
      color2: "#cf9b36",
      color3: "#d7ab45",
      color4: "#e4c65d",
      color5: "#f5e87d",
    },
    bgGradient: "linear-gradient(#02e3f2, #59b2ff)",
    name: "Golden Planet",
    description:
      "You have reached the pinnacle of space discovery. A warm fuzzy feeling and mounds of gold assure you that you have made the right choice.",
    planet: staticFile("planet-gold.png"),
    style: {},
    landingAdjustment: 0,
    sparkles: [],
  },
};

export const LandingScene: React.FC<z.infer<typeof planetSchema>> = ({
  planetType,
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

  const text = spring({
    fps: VIDEO_FPS,
    frame,
    delay: LANDING_FRAME,
    config: {
      damping: 40,
    },
  });

  const rocket = spring({
    fps: VIDEO_FPS,
    frame: frame / 4.5,
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
        fontSize: 60,

        background:
          "radial-gradient(121.11% 121.11% at 47.08% 100%, #0F102E 0%, #000 100%)",
      }}
    >
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
          opacity: frame < LANDING_FRAME ? frame / 600 : LANDING_FRAME / 600,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Stars />
      </div>

      <div
        style={{
          width: PLANET_SIZE - PLANET_GROWTH + planet * PLANET_GROWTH,
          position: "absolute",
          left:
            -(PLANET_SIZE - PLANET_GROWTH + planet * PLANET_GROWTH) / 2 + 530,
          bottom: -850 + planet * 120,
        }}
      >
        <Img
          src={attributes.planet}
          style={{ width: "100%", height: "100%", ...attributes.style }}
        />

        {/* <Planet /> */}
      </div>

      <div
        style={{
          width: 900 + 100 * cloud,
          position: "absolute",
          bottom: -450 + cloudOffset * 5.6,
          left: -150,
          transform: `scale(${cloudSize})`,
          opacity: (1 - cloud) * 1 + 0.7,
        }}
      >
        <Cloud1 {...attributes.colors} />
      </div>

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
        startFrame={LANDING_FRAME}
        x={550}
        y={680 - attributes.landingAdjustment}
        scale={1.8}
      />

      <h1
        style={{
          fontSize: 48,
          fontFamily: "Mona Sans",
          color: "white",
          opacity: text,
          textAlign: "left",
          left: 96,
          top: 48,
          position: "absolute",
        }}
      >
        You discovered the
      </h1>

      <h1
        style={{
          fontSize: 96,
          fontFamily: "Mona Sans",
          color: "white",
          opacity: text,
          textAlign: "left",
          left: 96,
          top: 80,
          position: "absolute",
        }}
      >
        {attributes.name}!
      </h1>

      <h1
        style={{
          fontSize: 96,
          fontFamily: "Mona Sans",
          color: "white",
          opacity: text,
          textAlign: "left",
          left: 96,
          top: 80,
          position: "absolute",
        }}
      >
        {attributes.name}!
      </h1>

      <h2
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
      </h2>

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
        <Rocket />
      </div>

      <div
        style={{
          width: 1000 + 100 * cloud,
          position: "absolute",
          bottom: -400 + cloudOffset * 3.8,
          right: -200,
          transform: `scale(${cloudSize})`,
          opacity: (1 - cloud) * 1 + 0.7,
        }}
      >
        <Cloud2 {...attributes.colors} />
      </div>

      {frame > LANDING_FRAME - 45 &&
        (attributes.sparkles as any).map(
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
                  (SPARKLE_SPEED / 4 - ((frame + 3 * index) % SPARKLE_SPEED)) /
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
  );
};
