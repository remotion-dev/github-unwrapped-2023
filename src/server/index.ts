import { ensureIndices } from "./db.js";
import { startServer } from "./server.js";

await ensureIndices();
await startServer();
