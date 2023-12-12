import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { PromoVideoLayout } from "./promo-video-layout";

const PLANETS_ASSETS = [
  staticFile("languages/go.png"),
  staticFile("languages/javascript.png"),
  staticFile("planet-fire.png"),
  staticFile("planet-leafy.png"),
  staticFile("planet-gold.png"),
  staticFile("languages/c.png"),
  staticFile("languages/rust.png"),
  staticFile("languages/php.png"),
];

export const Planets: React.FC<{
  layout: PromoVideoLayout;
}> = ({ layout }) => {
  const { height, width, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const PLANET_SIZE = layout === "short" ? 180 : 100;
  const PADDING_HORIZONTAL = layout === "short" ? 250 : 160;
  const PADDING_VERTICAL = layout === "short" ? 200 : 130;
  const PLANETS = 8;
  const COLUMNS = layout === "short" ? 2 : 4;
  const ROWS = PLANETS / COLUMNS;

  const planetEnter = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill>
      {new Array(8).fill(true).map((_, i) => {
        const spr = spring({
          fps,
          frame,
          config: {
            damping: 200,
          },
          delay: i,
        });

        const column = i % COLUMNS;
        const row = Math.floor(i / COLUMNS);
        const left =
          ((width - PADDING_HORIZONTAL * 2) / (COLUMNS - 1)) * column +
          PADDING_HORIZONTAL;
        const top =
          ((height - PADDING_VERTICAL * 2) / (ROWS - 1)) * row +
          PADDING_VERTICAL;

        const fromCenterX = left - width / 2;
        const fromCenterY = top - height / 2;
        const angle = Math.atan2(fromCenterY, fromCenterX);
        const distance = interpolate(spr, [0, 1], [700, 0]);
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        const src = PLANETS_ASSETS[i];

        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={{
              height: PLANET_SIZE,
              width: PLANET_SIZE,
              left: left + offsetX - PLANET_SIZE / 2,
              top: top + offsetY - PLANET_SIZE / 2,
              position: "absolute",
            }}
          >
            <Img
              src={src}
              style={{
                height: PLANET_SIZE,
                width: PLANET_SIZE,
                objectFit: "contain",
                scale: src.includes("languages") ? String(1.5) : String(1.6),
              }}
            />
          </div>
        );
      })}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontFamily: "Mona Sans",
            fontSize: 50,
            fontWeight: "bold",
            transform: `scale(${interpolate(planetEnter, [0, 1], [2, 1])})`,
          }}
        >
          {layout === "short" ? (
            <div style={{ textAlign: "center", fontSize: 80 }}>
              Explore your
              <br />
              planets
            </div>
          ) : null}
          {layout === "landscape" ? <span>Explore your planets</span> : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
