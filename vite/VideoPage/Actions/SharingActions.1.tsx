import { Link, useParams } from "@tanstack/react-router";
import { LinkedInIcon } from "../../../icons/LinkedInIcon";
import { XIcon } from "../../../icons/XIcon";
import type { accentColorValues } from "../../../src/config";
import { userRoute } from "../../routing";
import { SharingAction } from "./SharingAction";
import styles from "./styles.module.css";

export const SharingActions: React.FC<{
  accentColor: (typeof accentColorValues)[number];
}> = ({ accentColor }) => {
  const { username } = useParams({ from: userRoute.id });
  return (
    <div className={styles.sharingActionsWrapper}>
      <Link
        from={username}
        to={"share"}
        search={{ platform: "twitter", accentColor }}
      >
        <SharingAction
          icon={(params) => <XIcon {...params} />}
          label={"Post #GitHubUnwrapped"}
        />
      </Link>

      <Link
        from={username}
        to={"./share"}
        search={{ platform: "linkedin", accentColor }}
      >
        <SharingAction
          icon={(params) => <LinkedInIcon {...params} />}
          label="Share on LinkedIn"
        />
      </Link>
    </div>
  );
};
