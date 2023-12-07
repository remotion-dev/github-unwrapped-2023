import { AbsoluteFill, Sequence, random } from "remotion";
import { ANIMATION_DURATION_PER_STAR, Star } from "./Star";

export const TIME_INBETWEEN_STARS = 10;
const MAX_STARS = 20;
export const STAR_ANIMATION_DELAY = 20;
const MAX_HITS = 8;

export const getActualStars = (starsGiven: number) => {
  return Math.max(5, Math.min(starsGiven * 2, MAX_STARS));
};

export const getHitIndexes = ({
  starsDisplayed,
  seed,
  starsGiven,
}: {
  starsDisplayed: number;
  starsGiven: number;
  seed: string;
}): number[] => {
  const maxHits = Math.min(starsGiven, MAX_HITS);
  // Select hit indices randomly
  const hitIndexes = new Set<number>();

  let i = 0;
  while (hitIndexes.size < maxHits) {
    i++;
    hitIndexes.add(Math.floor(random(`${seed}${i}`) * starsDisplayed));
  }

  return Array.from(hitIndexes);
};

export const StarsFlying: React.FC<{
  starsGiven: number;
  hitIndices: number[];
}> = ({ starsGiven, hitIndices }) => {
  return (
    <AbsoluteFill>
      {new Array(getActualStars(starsGiven)).fill(true).map((_, index) => (
        <Sequence // eslint-disable-next-line react/no-array-index-key
          key={index}
          from={index * TIME_INBETWEEN_STARS + STAR_ANIMATION_DELAY}
        >
          <Star
            angle={random(`${index}a`) * Math.PI - Math.PI / 2}
            duration={ANIMATION_DURATION_PER_STAR}
            hitSpaceship={
              hitIndices.includes(index)
                ? { index: hitIndices.indexOf(index) }
                : null
            }
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
