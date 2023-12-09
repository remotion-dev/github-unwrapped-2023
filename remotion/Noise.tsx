import { noise2D } from "@remotion/noise";
import React, { useMemo } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { z } from "zod";

const unitSize = 15;

export const noiseSchema = z.object({
  translateX: z.number().step(1),
  translateY: z.number(),
});

const palette = [
  "#15466C",
  "#808080",
  "#615955",
  "#726455",
  "#7CA2C3",
  "#A1C2C0",
  "#AAA8A8",
  "#1C394A",
  "#3B6773",
  "#465B79",
];

if (palette.length !== 10) {
  throw new Error("Palette must have 10 colors");
}

export const Noise: React.FC<z.infer<typeof noiseSchema>> = ({
  translateX,
  translateY,
}) => {
  const { width, height } = useVideoConfig();

  const samples = useMemo(() => {
    const unitsHorizontal = width / unitSize;
    const unitsVertical = height / unitSize;

    const unitOffsetX = Math.floor(translateX / unitSize);
    const unitOffsetY = Math.floor(translateY / unitSize);
    return Array.from({ length: unitsHorizontal }, (_, column) => {
      return Array.from({ length: unitsVertical }, (__, row) => {
        const x = column - unitOffsetY;
        const y = row - unitOffsetX - x * unitsHorizontal;
        return { x: noise2D("seedx", y * 6, x * 6) };
      });
    });
  }, [height, translateX, translateY, width]);

  const memoizedSamples = useMemo(() => {
    return samples.map((sample, i) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} style={{ display: "flex", flexDirection: "row" }}>
          {sample.map((s, j) => {
            if (s.x < 0.9) {
              return null;
            }

            const str = String(s.x);
            const randomDigit = Number(str[2]);
            const randomDigit2 = Number(str[4]);
            const randomDigit3 = Number(str[6]);

            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`${i}-${j}`}
                style={{
                  width: 6 * randomDigit2 * 0.1,
                  height: 6 * randomDigit2 * 0.1,
                  left: i * unitSize,
                  top: j * unitSize,
                  position: "absolute",
                  transform: `translateY(${
                    translateX % unitSize
                  }px) translateX(${translateY % unitSize}px)`,
                  backgroundColor: palette[randomDigit],
                  fontSize: 10,
                  borderRadius: "50%",
                  opacity: randomDigit3 * 0.05 + 0.6,
                }}
              />
            );
          })}
        </div>
      );
    });
  }, [samples, translateX, translateY]);

  return <AbsoluteFill>{memoizedSamples}</AbsoluteFill>;
};
