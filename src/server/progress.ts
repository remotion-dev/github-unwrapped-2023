import type { RenderProgress } from "@remotion/lambda/client";
import type { Finality } from "./db.js";

export const getFinality = (
  renderProgress: RenderProgress,
): Finality | null => {
  if (renderProgress.outputFile) {
    return {
      type: "success",
      url: renderProgress.outputFile,
      outputSize: renderProgress.outputSizeInBytes as number,
      reportedCost: renderProgress.costs.accruedSoFar,
    };
  }

  if (renderProgress.fatalErrorEncountered) {
    return {
      type: "error",
      errors: renderProgress.errors[0].stack,
    };
  }

  return null;
};
