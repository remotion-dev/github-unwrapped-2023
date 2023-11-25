// node precompute-gradients.mjs
import { bundle } from "@remotion/bundler";
import { getCompositions, renderStill } from "@remotion/renderer";

const bundled = await bundle({ entryPoint: "remotion/index.ts" });

const compositions = await getCompositions(bundled);

const gradients = compositions.filter((c) => c.id.startsWith("Gradients-"));

for (const gradient of gradients) {
  console.log({ gradient });
  await renderStill({
    serveUrl: bundled,
    composition: gradient,
    scale: 2,
    output: "public/gradient/" + gradient.id + ".png",
  });
}
