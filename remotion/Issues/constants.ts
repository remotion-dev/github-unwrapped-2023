import { VIDEO_WIDTH } from "../../types/constants";
import { TL_ROCKET_HEIGHT } from "../TopLanguages/svgs/FrontRocketSource";

export const PADDING = 120;
export const USABLE_CANVAS_WIDTH = VIDEO_WIDTH - PADDING * 2;
export const ROCKET_ORIGIN_X = VIDEO_WIDTH / 2;
const ROCKET_ORIGIN_Y = VIDEO_WIDTH - 150;
export const ROCKET_TOP_Y = ROCKET_ORIGIN_Y - TL_ROCKET_HEIGHT / 2;
export const TIME_BEFORE_SHOOTING = 90;

export const getTotalShootDuration = (closedIssues: number) => {
  return Math.min(60, closedIssues * 10);
};
