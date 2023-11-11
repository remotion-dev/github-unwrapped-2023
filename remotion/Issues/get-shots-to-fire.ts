import { Internals } from "remotion";
import { findLineRectangleIntersection } from "./is-line-intersecting-rectangle";
import {
  BaseUfoPosition,
  ROCKET_ORIGIN_X,
  ROCKET_ORIGIN_Y,
  SHOOT_DURATION,
  TIME_BEFORE_SHOOTING,
} from "./make-ufo-positions";
import { UFO_HEIGHT, UFO_WIDTH } from "./Ufo";

type Explosion = {
  index: number;
  explodeAfterProgress: number;
};

export type Shot = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  explosions: Explosion[];
  shootDelay: number;
  shootDuration: number;
};

export const getShotsToFire = ({
  closedIndices,
  ufos,
}: {
  closedIndices: number[];
  ufos: BaseUfoPosition[];
}) => {
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
      explosions: [{ index: indexToShoot, explodeAfterProgress: 1 }],
      shootDelay: TIME_BEFORE_SHOOTING + shots.length * 10,
      shootDuration: SHOOT_DURATION,
    };

    const otherUfosHit = ufos
      .map((otherUfo, index) => {
        const intersection = findLineRectangleIntersection({
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
        if (!intersection) {
          return null;
        }

        const distanceToRocket = Math.sqrt(
          Math.pow(ROCKET_ORIGIN_X - intersection.x, 2) +
            Math.pow(ROCKET_ORIGIN_Y - intersection.y, 2)
        );
        const distanceToUfo = Math.sqrt(
          Math.pow(otherUfo.x - intersection.x, 2) +
            Math.pow(otherUfo.y - intersection.y, 2)
        );

        const explodeAfterProgress =
          distanceToRocket / (distanceToRocket + distanceToUfo);

        return { intersection, index, explodeAfterProgress };
      })
      .filter(Internals.truthy);

    for (const { index, explodeAfterProgress } of otherUfosHit) {
      ufosHit.push(index);
      shot.explosions.push({
        index,
        explodeAfterProgress,
      });
    }

    shots.push(shot);

    i++;
  }

  return shots;
};
