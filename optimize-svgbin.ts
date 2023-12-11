// bun optimize-all.ts

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { optimize } from "svgo";

const files = readdirSync("svgbin").filter((f) => f.endsWith(".svg"));

for (const file of files) {
  // console.log(`Optimizing ${file}...`);
  const filename = `svgbin/${file}`;
  const opt = optimize(readFileSync(filename, "utf-8"));
  writeFileSync(filename, opt.data);
}
