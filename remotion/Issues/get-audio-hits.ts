import { MAXIMUM_NUMBER_OF_AUDIO_TAGS } from "../audio-tags";
import type { ShotWithShootDelay } from "./get-shots-to-fire";
import { sampleUniqueIndices } from "./sample-indices";

export const getAudioHits = (shots: ShotWithShootDelay[]) => {
  const samples = sampleUniqueIndices(
    shots.length,
    Math.min(shots.length, MAXIMUM_NUMBER_OF_AUDIO_TAGS - 1),
  );
  return samples.map((index) => {
    return shots[index].shootDelay;
  });
};
