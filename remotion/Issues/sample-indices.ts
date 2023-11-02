import { random } from "remotion";

export function sampleUniqueIndices(
  arrayLength: number,
  sampleSize: number
): number[] {
  if (sampleSize > arrayLength) {
    throw new Error("Sample size cannot be greater than array length.");
  }

  const indices = new Set<number>();

  // Helper function to generate a random index within the array bounds
  const getRandomIndex = (iteration: number): number => {
    return Math.floor(random("hithere" + iteration) * arrayLength);
  };

  let i = 0;

  // Keep generating unique indices until we have enough
  while (indices.size < sampleSize) {
    indices.add(getRandomIndex(i++));
  }

  // Convert the Set to an array of numbers (indices) before returning
  return Array.from(indices).sort((a, b) => a - b);
}
