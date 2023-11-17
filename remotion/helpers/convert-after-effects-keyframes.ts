import type { Keyframe } from "./keyframes";

type KeyframeData = {
  transform: string;
  keyframeArray: Keyframe<
    number | [number, number] | [number, number, number]
  >[];
};

type ReturnType = {
  fps: number | null;
  sourceWidth: number | null;
  sourceHeight: number | null;
  keyframes: KeyframeData[];
};

export const convertAfterEffectsKeyFrames = (
  copiedData: string
): ReturnType => {
  const lines = copiedData.split("\n");
  if (lines.at(0) !== "Adobe After Effects 8.0 Keyframe Data") {
    throw new Error(
      "Not a valid After Effects keyframe data (does not start with 'Adobe After Effects 8.0 Keyframe Data'"
    );
  }

  if (lines.at(-1) !== "End of Keyframe Data") {
    throw new Error(
      "Not a valid After Effects keyframe data (does not end with 'End of Keyframe Data'"
    );
  }

  let fps: number | null = null;
  let sourceWidth: number | null = null;
  let sourceHeight: number | null = null;

  const keyframes: KeyframeData[] = [];
  let isInKeyFrameMode = false;
  let isInKeyFrameHeaderMode = false;

  for (const line of lines) {
    if (line.startsWith("Adobe After Effects")) {
      isInKeyFrameMode = false;
      isInKeyFrameHeaderMode = false;
      continue;
    }

    if (line.startsWith("End of Keyframe Data")) {
      isInKeyFrameMode = false;
      isInKeyFrameHeaderMode = false;
      continue;
    }

    if (line.trim() === "") {
      isInKeyFrameMode = false;
      isInKeyFrameHeaderMode = false;
      continue;
    }

    const tabs = line.split("\t");

    if (isInKeyFrameMode) {
      const keyframe = tabs.map((t) => Number(t ?? "0"));
      const keyframeData = keyframes[keyframes.length - 1];

      const val = keyframe.slice(2, keyframe.length - 1) as
        | [number]
        | [number, number]
        | [number, number, number];

      keyframeData.keyframeArray.push({
        time: keyframe[1] ?? 0,
        value: val.length === 1 ? val[0] : val,
        easing: "linear",
      });
      continue;
    }

    if (isInKeyFrameHeaderMode) {
      isInKeyFrameMode = true;
    }

    if (tabs[1] === "Units Per Second") {
      fps = Number(tabs[2]);
    }

    if (tabs[1] === "Source Height") {
      sourceHeight = Number(tabs[2]);
    }

    if (tabs[1] === "Source Width") {
      sourceWidth = Number(tabs[2]);
    }

    if (tabs[0] === "Transform") {
      keyframes.push({ transform: tabs[1], keyframeArray: [] });
      isInKeyFrameHeaderMode = true;
    }
  }

  return { fps, sourceWidth, sourceHeight, keyframes };
};
