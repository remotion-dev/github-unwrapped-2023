import { Internals } from "remotion";
import { findLineRectangleIntersection } from "./is-line-intersecting-rectangle";
import {
  getFramesAfterWhichShootProgressIsReached,
  ROCKET_ORIGIN_X,
  ROCKET_TOP_Y,
  SHOOT_DURATION,
  TIME_BEFORE_SHOOTING,
  UfoPosition,
} from "./make-ufo-positions";
import { UFO_HEIGHT, UFO_WIDTH } from "./Ufo";

type Explosion = {
  index: number;
  explodeAfterProgress: number;
  explodeAfterFrames: number;
};

export type Shot = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  explosions: Explosion[];
  shootDelay: number;
};

const HIT_BOX_SCALE = 0.7;

const findClosestUfoRemaining = ({
  referenceUfo,
  remainingUfos,
}: {
  referenceUfo: UfoPosition;
  remainingUfos: UfoPosition[];
}) => {
  let closestUfo: UfoPosition | null = null;
  let closestDistance = Infinity;

  for (const ufo of remainingUfos) {
    const distance = Math.sqrt(
      Math.pow(referenceUfo.x - ufo.x, 2) + Math.pow(referenceUfo.y - ufo.y, 2)
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestUfo = ufo;
    }
  }

  return closestUfo ?? null;
};

export const getShotsToFire = ({
  closedIndices,
  ufos,
}: {
  closedIndices: number[];
  ufos: UfoPosition[];
}) => {
  let ufosHit: number[] = [];
  const shots: Shot[] = [];
  let ufoToShoot: number | null = closedIndices[0];

  while (true) {
    if (ufosHit.length >= closedIndices.length) {
      break;
    }
    if (ufoToShoot === null) {
      break;
    }
    if (ufosHit.includes(ufoToShoot)) {
      const closest = findClosestUfoRemaining({
        referenceUfo: ufos[ufoToShoot],
        remainingUfos: ufos.filter((ufo, index) => !ufosHit.includes(index)),
      });
      if (closest === null) {
        ufoToShoot = null;
      } else {
        ufoToShoot = ufos.indexOf(closest);
      }
      continue;
    }
    ufosHit.push(ufoToShoot);

    const ufo = ufos[ufoToShoot];

    const shot: Shot = {
      endX: ufo.x,
      endY: ufo.y,
      startX: ROCKET_ORIGIN_X,
      startY: ROCKET_TOP_Y,
      explosions: [
        {
          index: ufoToShoot,
          explodeAfterProgress: 1,
          explodeAfterFrames: SHOOT_DURATION,
        },
      ],
      shootDelay: TIME_BEFORE_SHOOTING + shots.length * 2,
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
          width: UFO_WIDTH * otherUfo.scale * HIT_BOX_SCALE,
          height: UFO_HEIGHT * otherUfo.scale * HIT_BOX_SCALE,
        });

        if (ufosHit.includes(index)) {
          return null;
        }
        if (!intersection) {
          return null;
        }

        const distanceToRocket = Math.sqrt(
          Math.pow(ROCKET_ORIGIN_X - intersection.x, 2) +
            Math.pow(ROCKET_TOP_Y - intersection.y, 2)
        );
        const distanceToShotEnd = Math.sqrt(
          Math.pow(shot.endX - intersection.x, 2) +
            Math.pow(shot.endY - intersection.y, 2)
        );

        const explodeAfterProgress =
          distanceToRocket / (distanceToRocket + distanceToShotEnd);

        return { intersection, index, explodeAfterProgress };
      })
      .filter(Internals.truthy);

    for (const { index, explodeAfterProgress } of otherUfosHit) {
      ufosHit.push(index);
      shot.explosions.push({
        index,
        explodeAfterProgress,
        explodeAfterFrames:
          getFramesAfterWhichShootProgressIsReached(explodeAfterProgress),
      });
    }

    shots.push(shot);
  }

  return shots;
};

export const getExplosions = ({
  shots,
  ufos,
}: {
  shots: Shot[];
  ufos: UfoPosition[];
}) => {
  return shots.flatMap((shot) => {
    return shot.explosions.map((explosion) => {
      return {
        index: explosion.index,
        explodeAfterFrames: explosion.explodeAfterFrames + shot.shootDelay,
        x: ufos[explosion.index].x,
        y: ufos[explosion.index].y,
      };
    });
  });
};
