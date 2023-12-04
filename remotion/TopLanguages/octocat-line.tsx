import { reduceInstructions, serializeInstructions } from "@remotion/paths";

export const getOctocatLine = ({
  noise1,
  noise2,
  noise3,
  noise4,
  noise5,
  endOffsetX,
  endOffsetY,
}: {
  noise1: number;
  noise2: number;
  noise3: number;
  noise4: number;
  noise5: number;
  endOffsetX: number;
  endOffsetY: number;
}) => {
  const offsetX = noise1 * 15;
  const offsetY = noise2 * 15;

  const offsetX2 = noise3 * 15;
  const offsetY2 = noise4 * 15;

  const offsetY0 = noise5 * 15;

  const instructions = reduceInstructions([
    {
      type: "M",
      x: 1450.75,
      y: 489.02 + offsetY0,
    },
    {
      type: "C",
      cp1x: 1236.48,
      cp1y: 461.95 + offsetY0,
      cp2x: 1336.89 + offsetX,
      cp2y: 643.47 + offsetY,
      x: 1363.29 + offsetX,
      y: 762.83 + offsetY,
    },
    {
      type: "C",
      cp1x: 1378.57 + offsetX,
      cp1y: 831.91 + offsetY,
      cp2x: 1383.16 + offsetX2,
      cp2y: 978.91 + offsetY2,
      x: 1276.4 + offsetX2,
      y: 947.78 + offsetY2,
    },
    {
      type: "C",
      cp1x: 1212.86 + offsetX2,
      cp1y: 927.1 + offsetY2,
      cp2x: 1174.59 + endOffsetX,
      cp2y: 847.88 + endOffsetY,
      x: 1117 + endOffsetX,
      y: 823 + endOffsetY,
    },
  ]);

  return serializeInstructions(instructions);
};
