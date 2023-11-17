import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { build } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

await build({
  root: path.resolve(__dirname, "."),
  base: "/",
  plugins: [react()],
});
