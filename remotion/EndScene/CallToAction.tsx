import React, { useMemo } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import type { Planet } from "../../src/config";
import {
  planetToCTABg,
  planetToCTAGradient,
  planetToCatColor,
} from "../planets";

const padding = 10;
const iconHeight = 120;

export const CallToAction: React.FC<{
  exitProgress: number;
  enterProgress: number;
  planet: Planet;
}> = ({ exitProgress, enterProgress, planet }) => {
  const startDistance = 10;
  const stillDistance = 1;
  const endDistance = 0.1;

  const distance = interpolate(
    enterProgress + exitProgress,
    [0, 1, 2],
    [startDistance, stillDistance, endDistance],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const scale = 1 / distance;

  const enterOffset =
    (Math.sin(enterProgress * Math.PI * 0.5 - Math.PI) + 1) * -600;
  const onSinus = -exitProgress * Math.PI * 0.8 - Math.PI * 0.5;

  const offset = (Math.sin(onSinus) + 1) * -200;

  const backgroundColor = useMemo(() => {
    return planetToCTABg(planet);
  }, [planet]);

  const border = useMemo(() => {
    return "2px solid rgba(255, 255, 255, 0.2)";
  }, []);

  const gradient = useMemo(() => {
    return planetToCTAGradient(planet);
  }, [planet]);

  const catColor = useMemo(() => {
    return planetToCatColor(planet);
  }, [planet]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        transform: `translateY(${enterOffset}px) scale(${scale}) translateY(${offset}px)`,
      }}
    >
      <div
        style={{
          backgroundColor,
          border,
          paddingLeft: padding,
          paddingRight: padding * 3,
          flexDirection: "row",
          display: "flex",
          height: iconHeight + padding * 2,
          borderRadius: (iconHeight + padding) / 2,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          style={{
            height: iconHeight,
            marginRight: 30,
          }}
          viewBox="0 0 496 512"
        >
          <path
            fill={catColor}
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          />
        </svg>
        <div>
          <div
            style={{
              fontFamily: "Mona Sans",
              color: "white",
              fontSize: 30,
              fontWeight: "500",
              backgroundClip: "text",
              backgroundImage: gradient,
              WebkitBackgroundClip: "text",
              backgroundColor: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Get your year in review
          </div>
          <div
            style={{
              fontFamily: "Mona Sans",
              color: "white",
              fontSize: 50,
              fontWeight: "bold",
              backgroundClip: "text",
              backgroundImage: gradient,
              WebkitBackgroundClip: "text",
              backgroundColor: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            GithubUnwrapped.com
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
