import { noise2D } from "@remotion/noise";
import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { z } from "zod";

export const sevenSegmentSchema = z.object({
  num: z.number().min(0),
  fontSize: z.number().min(0),
  max: z.number().min(0).nullable(),
});

export const getSevenSegmentAssetsToPrefetch = () => [
  "sevensegment/background.png",
  "sevensegment/0.png",
  "sevensegment/1.png",
  "sevensegment/2.png",
  "sevensegment/3.png",
  "sevensegment/4.png",
  "sevensegment/5.png",
  "sevensegment/6.png",
  "sevensegment/7.png",
  "sevensegment/8.png",
  "sevensegment/9.png",
];

export const SevenSegment: React.FC<z.infer<typeof sevenSegmentSchema>> = ({
  num,
  fontSize,
  max,
}) => {
  const frame = useCurrentFrame();

  const digits = max ? String(max).length : String(num).length;

  const fullNum = String(num).padStart(digits, "0");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {new Array(digits).fill(true).map((n, i) => {
        const opacity = ((noise2D(i + "x", frame / 15, 0) + 1) / 2) * 0.3 + 0.7;

        const digit = fullNum[i];
        const allBeforeAreZeroes = fullNum
          .slice(0, i + 1)
          .split("")
          .every((x) => {
            return x === "0";
          });

        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i + n}
            style={{
              aspectRatio: "119 / 172",
              display: "inline-block",
              height: fontSize,
              textAlign: "right",
              marginLeft: -fontSize / 15,
              marginRight: -fontSize / 15,
              position: "relative",
            }}
          >
            <Img
              style={{
                height: fontSize,
                position: "absolute",
                opacity: 0.05,
                right: 0,
              }}
              src={staticFile(`sevensegment/background.png`)}
            />
            {allBeforeAreZeroes ? null : (
              <Img
                style={{
                  height: fontSize,
                  opacity,
                  right: 0,
                  position: "absolute",
                  aspectRatio: "119 / 172",
                }}
                src={staticFile(`sevensegment/${digit}.png`)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
