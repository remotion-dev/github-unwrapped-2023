import { z } from "zod";

export const promoVideoLayout = z.enum(["short", "landscape"]);

export type PromoVideoLayout = z.infer<typeof promoVideoLayout>;
