import { spawn } from "child_process";

spawn("npx", ["tsx", "watch", "server/index.ts"], {
  stdio: "inherit",
  shell: process.platform === "win32" ? "cmd.exe" : undefined,
});

console.log("Starting frontend...");
spawn("npx", ["vite"], {
  stdio: "inherit",
  shell: process.platform === "win32" ? "cmd.exe" : undefined,
});
