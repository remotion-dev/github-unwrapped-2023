import { reduceInstructions, serializeInstructions } from "@remotion/paths";

export const getOctocatLine = () => {
  const instructions = reduceInstructions([
    {
      type: "M",
      x: 1450.75,
      y: 489.02,
    },
    {
      type: "C",
      cp1x: 1236.48,
      cp1y: 461.95,
      cp2x: 1336.89,
      cp2y: 643.47,
      x: 1363.29,
      y: 762.83,
    },
    {
      type: "C",
      cp1x: 1378.57,
      cp1y: 831.91,
      cp2x: 1383.16,
      cp2y: 978.91,
      x: 1276.4,
      y: 947.78,
    },
    {
      type: "C",
      cp1x: 1212.86,
      cp1y: 927.1,
      cp2x: 1174.59,
      cp2y: 847.88,
      x: 1119.43,
      y: 825.71,
    },
  ]);

  const d = serializeInstructions(instructions);
  return d;
};
