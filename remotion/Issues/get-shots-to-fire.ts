import { Internals } from "remotion";
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
  let ufosHit: number[] = [];
  const shots: Shot[] = [];
  let i = 0;

  while (true) {
    if (ufosHit.length === closedIndices.length) {
      break;
    }
    const indexToShoot = closedIndices[i];
    if (ufosHit.includes(indexToShoot)) {
      i++;
      continue;
    }
    ufosHit.push(indexToShoot);

    const ufo = ufos[indexToShoot];

    const shot: Shot = {
      endX: ufo.x,
      endY: ufo.y,
      startX: ROCKET_ORIGIN_X,
      startY: ROCKET_ORIGIN_Y,
    };

    const otherUfosHit = ufos
      .map((otherUfo, index) => {
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
        if (ufosHit.includes(index)) {
          return null;
        }
        if (!isIntersecting) {
          return null;
        }
        return { intersection: isIntersecting, index };
      })
      .filter(Internals.truthy);

    for (const { index } of otherUfosHit) {
      ufosHit.push(index);
    }

    shots.push(shot);

    console.log({ otherUfosHit, ufosHit, shots });
    i++;
  }
};
