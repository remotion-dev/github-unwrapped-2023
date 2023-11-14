import React from "react";
import { Img, staticFile } from "remotion";
import { z } from "zod";

export const sevenSegmentSchema = z.object({
  num: z.number().min(0),
  fontSize: z.number().min(0),
  max: z.number().min(0).nullable(),
});

export const SevenSegment: React.FC<z.infer<typeof sevenSegmentSchema>> = ({
  num,
  fontSize,
  max,
}) => {
  const digits = max ? String(max).length : String(num).length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {new Array(digits).fill(true).map((n, i) => {
        return (
          <div
            key={i + n}
            style={{
              aspectRatio: "119 / 172",
              display: "inline-block",
              height: fontSize,
              textAlign: "right",
              marginLeft: -fontSize / 20,
              marginRight: -fontSize / 20,
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
            ></Img>
            <Img
              style={{
                height: fontSize,
              }}
              src={staticFile(
                `sevensegment/${String(num).padStart(digits, "0")[i]}.png`
              )}
            ></Img>
          </div>
        );
      })}
    </div>
  );
};
