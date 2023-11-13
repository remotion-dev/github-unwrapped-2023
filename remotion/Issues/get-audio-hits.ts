import { ShotWithShootDelay } from "./get-shots-to-fire";
import { sampleUniqueIndices } from "./sample-indices";

export const getAudioHits = (shots: ShotWithShootDelay[]) => {
  const samples = sampleUniqueIndices(shots.length, Math.min(shots.length, 20));
  return samples.map((index) => {
    return shots[index].shootDelay;
  });
};
