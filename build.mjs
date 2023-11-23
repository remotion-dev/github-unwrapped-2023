import react from "@vitejs/plugin-react-swc";
import { execSync } from "child_process";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { build } from "vite";

config();

const __dirname = fileURLToPath(new URL(".", import.meta.url));

await build({
  root: path.resolve(__dirname, "./vite"),
  base: "/",
  plugins: [react()],
  publicDir: path.join(__dirname, "public"),
});

await execSync("npx tsc -p tsconfig.node.json", {
  stdio: "inherit",
});
