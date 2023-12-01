import type { SVGProps } from "react";

export type PlanetProps = SVGProps<SVGSVGElement> & {
  customColor: string | null;
};
