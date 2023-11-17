import { spawn } from "child_process";
import { startServer } from "./server";

startServer();
console.log("Starting frontend...");
spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  shell: process.platform === "win32" ? "cmd.exe" : undefined,
});
