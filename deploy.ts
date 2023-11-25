import {
  deployFunction,
  deploySite,
  getOrCreateBucket,
  getRegions,
} from "@remotion/lambda";
import dotenv from "dotenv";
import path from "path";
import { RAM, SITE_NAME, TIMEOUT } from "./src/config";
import { getAccountCount } from "./src/helpers/get-account-count";
import { setEnvForKey } from "./src/helpers/set-env-for-key";

dotenv.config();

const count = getAccountCount();
console.log(`Found ${count} accounts. Deploying...`);

for (let i = 1; i <= count; i++) {
  for (const region of getRegions()) {
    setEnvForKey(i);
    console.log(`Deploying to ${region} in account ${i}`);
    const { functionName, alreadyExisted } = await deployFunction({
      createCloudWatchLogGroup: true,
      memorySizeInMb: RAM,
      timeoutInSeconds: TIMEOUT,
      region,
    });
    console.log(
      `  ${
        alreadyExisted ? "Ensured" : "Deployed"
      } function "${functionName}" to ${region} in account ${i}`,
    );
    const { bucketName } = await getOrCreateBucket({ region });
    const { serveUrl } = await deploySite({
      siteName: SITE_NAME,
      bucketName,
      entryPoint: path.join(process.cwd(), "remotion/index.ts"),
      region,
    });
    console.log(
      `  Deployed site to ${region} in account ${i} under ${serveUrl}`,
    );
  }
}
