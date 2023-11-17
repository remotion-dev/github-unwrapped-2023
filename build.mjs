import react from "@vitejs/plugin-react-swc";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { build } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

await build({
  root: path.resolve(__dirname, "./components"),
  base: "/",
  plugins: [react()],
});

await execSync("npx tsc -p tsconfig.node.json", {
  stdio: "inherit",
});
