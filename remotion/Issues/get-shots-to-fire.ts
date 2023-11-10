import { findLineRectangleIntersection } from "./is-line-intersecting-rectangle";
import {
  BaseUfoPosition,
  ROCKET_ORIGIN_X,
  ROCKET_ORIGIN_Y,
} from "./make-ufo-positions";
import { UFO_HEIGHT, UFO_WIDTH } from "./Ufo";

type Shot = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export const getShotsToFire = (
  closedIndices: number[],
  ufos: BaseUfoPosition[]
) => {
  let hits = [];
  const shots: Shot[] = [];
  let i = -1;

  while (true) {
    i++;
    const ufo = ufos[i];
    const shot: Shot = {
      endX: ufo.x,
      endY: ufo.y,
      startX: ROCKET_ORIGIN_X,
      startY: ROCKET_ORIGIN_Y,
    };
    const otherUfosHit = ufos.map((otherUfo) => {
      const isIntersecting = findLineRectangleIntersection({
        startX: shot.startX,
        startY: shot.startY,
        endX: shot.endX,
        endY: shot.endY,
        centerX: otherUfo.x,
        centerY: otherUfo.y,
        width: UFO_WIDTH * otherUfo.scale,
        height: UFO_HEIGHT * otherUfo.scale,
      });
      return isIntersecting;
    });
    console.log(otherUfosHit);
    break;
  }
};
