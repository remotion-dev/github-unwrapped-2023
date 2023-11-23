import { z } from "zod";

export const cornerType = z.enum(["top-left", "top-right", "bottom-left", "bottom-right"]);
export type Corner = z.infer<typeof cornerType>;
