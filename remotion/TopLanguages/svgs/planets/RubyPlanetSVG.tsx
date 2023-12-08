import { Img, staticFile } from "remotion";
import { type PlanetBoundingBox } from "../../planet-types";
import type { PlanetProps } from "./svg-types";

export const RubyPlanetBoundingBox: PlanetBoundingBox = {
  width: 1080,
  height: 1080,
};

export const RubySource = staticFile("languages/ruby.png");

export const RubyPlanet = ({ src, ...props }: PlanetProps) => (
  // @ts-expect-error
  <Img src={staticFile("languages/ruby.png")} {...props} />
);
