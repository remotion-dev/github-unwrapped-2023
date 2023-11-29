import * as Sentry from "@sentry/node";
import { backendCredentials } from "../helpers/domain.js";
import { ensureIndices } from "./db.js";
import { nodeEnv } from "./index-html.js";
import { startServer } from "./server.js";

Sentry.init({
  dsn: backendCredentials().SENTRY_DSN,
  environment: nodeEnv,
  maxBreadcrumbs: 50,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  integrations: [
    new Sentry.Integrations.LocalVariables({
      captureAllExceptions: true,
    }),
  ],
});

await ensureIndices();
await startServer();
