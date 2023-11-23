import React, { useMemo } from "react";
import { interpolate, random, Sequence, useCurrentFrame } from "remotion";
import { StarSprite } from "../StarSprite";

const MOVE_AIM = 100;
const HIT_RADIUS = 500;

const MIN_NON_HIT_RADIUS = 900  
const MAX_NON_HIT_RADIUS = 1200;

const MAX_STARS = 50
const MAX_HITS = 10

export const Star: React.FC<{ initialFrame: number; transitionDuration: number;totalStars: number }> = ({ initialFrame, transitionDuration, totalStars }) => {
  totalStars = Math.min(totalStars, MAX_STARS)
  const hitProbability = useMemo(() => interpolate(totalStars, [0, MAX_HITS, MAX_STARS], [1, 0.9, 0.4]),[totalStars])
  const hitSpaceship = useMemo(() => random(null) <  hitProbability,[hitProbability])
  const frame = useCurrentFrame();

  const randomValue = useMemo(() => random(null), []);
  const interpolateRandom = interpolate(
    randomValue,
    [0, 1],
    [-Math.PI / 2, Math.PI / 2]
  );

  const randomRadiusMultiplier = useMemo(() => random(null), []);

  const randomRadius = hitSpaceship ? randomRadiusMultiplier * HIT_RADIUS :  randomRadiusMultiplier * (MAX_NON_HIT_RADIUS - MIN_NON_HIT_RADIUS) + MIN_NON_HIT_RADIUS;

  const x = Math.sin(interpolateRandom);
  const y = Math.cos(interpolateRandom);

  const translateY =  MOVE_AIM -y * randomRadius;
  const translateX = x * randomRadius;


  const scale = interpolate(frame, [initialFrame, initialFrame + transitionDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} from={initialFrame}>
      {/* <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pie
          radius={HIT_RADIUS}
          progress={0.5}
          fill="white"
          rotation={-0.5 * Math.PI}
          style={{
            transform: `translateY(100px)`,
            opacity: 0.1,
          }}
        />
      </AbsoluteFill> */}

      <Sequence
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          transform: `translateX(${translateX* scale}px) translateY(${translateY*scale}px) scale(${
            scale*0.7
          })`,
          opacity: frame < initialFrame + transitionDuration ? 1 : 0,
        }}
      >
        <StarSprite burstFrame={hitSpaceship ? transitionDuration * (2/3) : undefined} transitionDuration={transitionDuration}/>
        {/* <StarSprite  transitionDuration={transitionDuration}/> */}

      </Sequence>
      {/* <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            background: "dodgerblue",
            zIndex: 100,
            transform: `translateY(${translateY}px) translateX(${translateX}px)`,
          }}
        ></div>
      </AbsoluteFill> */}
    </Sequence>
  );
};
