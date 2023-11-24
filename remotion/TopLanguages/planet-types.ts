export type PlanetBoundingBox = {
  width: number;
  height: number;
};

export const toViewBox = ({ height, width }: PlanetBoundingBox) => {
  return `0 0 ${width} ${height}`;
};
