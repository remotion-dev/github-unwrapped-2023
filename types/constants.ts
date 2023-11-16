import { z } from "zod";

export const COMP_NAME = "MyComp";

export const CompositionProps = z.object({
  title: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "Next.js and Remotion",
};

export const DURATION_IN_FRAMES = 200;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_FPS = 30;
export const TOP_LANGUAGES_DURATION = 15 * 30;
export const TRANSFORM_PATH_Y = 0;
export const TRANSFORM_PATH_X = 0;

export const RATE_DECREASE = 1 / TOP_LANGUAGES_DURATION;
