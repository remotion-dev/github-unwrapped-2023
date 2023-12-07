import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { StarSprite } from "../StarSprite";
import { SHINES_ASSETS } from "./Shines";
import { SHINY_STAR_OUTLINE_ASSET } from "./ShinyStarOutline";

const MOVE_AIM = 100;
export const HIT_RADIUS = 450;

export const ANIMATION_DURATION_PER_STAR = 20;

const WINDSHIELD_HIT_SOUNDS = [
  staticFile("impact-stone-1.mp3"),
  staticFile("impact-stone-2.mp3"),
  staticFile("impact-stone-3.mp3"),
  staticFile("impact-stone-4.mp3"),
];

export const starsAssetsToPreload = () => {
  return [...WINDSHIELD_HIT_SOUNDS, SHINES_ASSETS, SHINY_STAR_OUTLINE_ASSET];
};

export const getStarBurstFirstFrame = ({
  hitSpaceship,
  duration,
}: {
  hitSpaceship: boolean;
  duration: number;
}) => {
  const stop = hitSpaceship ? duration * 0.5 : duration;

  return stop;
};

export const Star: React.FC<{
  duration: number;
  angle: number;
  hitSpaceship: null | { index: number };
}> = ({ duration, angle, hitSpaceship }) => {
  const frame = useCurrentFrame();

  const randomRadius = hitSpaceship ? 200 : 400;

  const x = Math.sin(angle);
  const y = Math.cos(angle);

  const translateY = MOVE_AIM - y * randomRadius;
  const translateX = x * randomRadius;

  const stop = getStarBurstFirstFrame({
    duration,
    hitSpaceship: Boolean(hitSpaceship),
  });

  const distance = interpolate(frame, [0, stop], [1, stop ? 0.5 : 0.000001], {
    extrapolateRight: hitSpaceship ? "clamp" : "extend",
  });
  const justScale = 1 / distance - 1;

  const extraScale = hitSpaceship
    ? interpolate(frame, [stop, stop + 6], [0, 0.1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const scale = justScale + extraScale;

  const shouldDisplayHit = hitSpaceship
    ? frame < stop + 6
    : scale < 1000 && scale > 0;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {shouldDisplayHit ? (
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${scale * 0.7}) translateX(${
              translateX * scale
            }px) translateY(${translateY * scale}px)`,
          }}
        >
          <StarSprite burstFrame={hitSpaceship ? stop : undefined} />
          {hitSpaceship ? (
            <Sequence>
              <Audio
                src={
                  WINDSHIELD_HIT_SOUNDS[
                    hitSpaceship.index % WINDSHIELD_HIT_SOUNDS.length
                  ]
                }
                volume={0.4}
              />
            </Sequence>
          ) : null}
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
