import { Internals } from "remotion";
import { UFO_HEIGHT, UFO_WIDTH } from "./Ufo";
import {
  ROCKET_ORIGIN_X,
  ROCKET_TOP_Y,
  TIME_BEFORE_SHOOTING,
  getTotalShootDuration,
} from "./constants";
import { findLineRectangleIntersection } from "./is-line-intersecting-rectangle";
import type { UfoPosition } from "./make-ufo-positions";
import { getFramesAfterWhichShootProgressIsReached } from "./make-ufo-positions";

type Explosion = {
  index: number;
  explodeAfterProgress: number;
};

type Shot = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  explosions: Explosion[];
};

export type ShotWithShootDelay = Shot & {
  shootDelay: number;
};

const HIT_BOX_SCALE = 0.6;

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
      (referenceUfo.x - ufo.x) ** 2 + (referenceUfo.y - ufo.y) ** 2,
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestUfo = ufo;
    }
  }

  return closestUfo ?? null;
};

export const getShootDuration = (shots: Shot[]) => {
  return getTotalShootDuration(shots.length) / shots.length;
};

export const addShootDelays = (shots: Shot[]) => {
  return shots.map((shot, index) => {
    return {
      ...shot,
      shootDelay: TIME_BEFORE_SHOOTING + index * getShootDuration(shots),
    };
  });
};

export const getShotsToFire = ({
  closedIndices,
  ufos,
}: {
  closedIndices: number[];
  ufos: UfoPosition[];
}) => {
  const ufosHit: number[] = [];
  const shots: Shot[] = [];
  let ufoToShoot: number | null = closedIndices[0];

  // eslint-disable-next-line no-constant-condition
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
        remainingUfos: ufos.filter((_, index) => !ufosHit.includes(index)),
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
        },
      ],
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
          (ROCKET_ORIGIN_X - intersection.x) ** 2 +
            (ROCKET_TOP_Y - intersection.y) ** 2,
        );
        const distanceToShotEnd = Math.sqrt(
          (shot.endX - intersection.x) ** 2 + (shot.endY - intersection.y) ** 2,
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
      });
    }

    shots.push(shot);
  }

  return shots;
};

export type ExplosionExpanded = {
  index: number;
  explodeAfterFrames: number;
  x: number;
  y: number;
};

export const getExplosions = ({
  shots,
  ufos,
}: {
  shots: ShotWithShootDelay[];
  ufos: UfoPosition[];
}): ExplosionExpanded[] => {
  return shots.flatMap((shot) => {
    return shot.explosions.map((explosion) => {
      const explodeAfterFrames = getFramesAfterWhichShootProgressIsReached(
        explosion.explodeAfterProgress,
        getShootDuration(shots),
      );
      return {
        index: explosion.index,
        explodeAfterFrames: explodeAfterFrames + shot.shootDelay,
        x: ufos[explosion.index].x,
        y: ufos[explosion.index].y,
      };
    });
  });
};
