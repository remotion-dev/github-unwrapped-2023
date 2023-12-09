import { staticFile } from "remotion";
import { MAXIMUM_NUMBER_OF_AUDIO_TAGS } from "../audio-tags";
import type { ShotWithShootDelay } from "./get-shots-to-fire";
import { sampleUniqueIndices } from "./sample-indices";

const MAX_SHOTS = 5;
const MAX_HITS = 4;

if (MAX_SHOTS + MAX_HITS > MAXIMUM_NUMBER_OF_AUDIO_TAGS - 1) {
  throw new Error(
    "MAX_SHOTS + MAX_HITS must be less than MAXIMUM_NUMBER_OF_AUDIO_TAGS -1",
  );
}

type AudioSample = {
  type: "shot" | "explosion";
  delay: number;
  source: string;
};

const SHOT_SOUNDS = [staticFile("shot.mp3")];

export const getIssueSounds = () => {
  return [...SHOT_SOUNDS];
};

export const getAudioHits = (shots: ShotWithShootDelay[]): AudioSample[] => {
  const shotSamples = sampleUniqueIndices(
    shots.length,
    Math.min(shots.length, MAX_SHOTS),
  );

  return [
    ...shotSamples.map((index): AudioSample => {
      return {
        type: "shot" as const,
        delay: shots[index].shootDelay - 5,
        source: SHOT_SOUNDS[index % SHOT_SOUNDS.length],
      };
    }),
  ];
};
