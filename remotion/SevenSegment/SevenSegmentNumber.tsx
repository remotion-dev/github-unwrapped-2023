import React from "react";
import { Img, staticFile } from "remotion";
import { z } from "zod";

export const sevenSegmentSchema = z.object({
  num: z.number().min(0),
  fontSize: z.number().min(0),
});

export const SevenSegment: React.FC<z.infer<typeof sevenSegmentSchema>> = ({
  num,
  fontSize,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {String(num)
        .split("")
        .map((n, i) => {
          return (
            <div
              key={i}
              style={{
                aspectRatio: "119 / 172",
                display: "inline-block",
                height: fontSize,
                textAlign: "right",
              }}
            >
              <Img
                style={{
                  height: fontSize,
                  marginLeft: -fontSize / 20,
                  marginRight: -fontSize / 20,
                }}
                src={staticFile(`sevensegment/${n}.png`)}
              ></Img>
            </div>
          );
        })}
    </div>
  );
};
