import { Link } from "@tanstack/react-router";
import { InstagramIcon } from "../../../icons/InstagramIcon";
import { LinkedInIcon } from "../../../icons/LinkedInIcon";
import { XIcon } from "../../../icons/XIcon";
import type { accentColorValues } from "../../../src/config";
import { userRoute, videoRoute } from "../../routing";
import { SharingAction } from "./SharingAction";
import styles from "./styles.module.css";

export const twitterSharingLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  "This is my #GitHubUnwrapped! Get your own: https://githubunwrapped.com",
)}`;

export const linkedInSharingLink = "https://www.linkedin.com/";

export const SharingActions: React.FC<{
  accentColor: (typeof accentColorValues)[number];
}> = ({ accentColor }) => {
  const { username } = userRoute.useParams();
  return (
    <div className={styles.sharingActionsWrapper}>
      <Link
        from={userRoute.id}
        to={"share"}
        params={() => {
          return { username };
        }}
        search={{ platform: "twitter", accentColor }}
      >
        <SharingAction
          icon={(params) => <XIcon {...params} />}
          label={"Post #GitHubUnwrapped"}
          style={{ width: "100%", justifyContent: "flex-start", padding: 0 }}
        />
      </Link>
      <Link
        from={videoRoute.id}
        to={"share"}
        params={{ username }}
        search={{ platform: "linkedin", accentColor }}
      >
        <SharingAction
          icon={(params) => <LinkedInIcon {...params} />}
          label="Share on LinkedIn"
          style={{ width: "100%", justifyContent: "flex-start", padding: 0 }}
        />
      </Link>
      <a href={`/ig/${username}.jpg`}>
        <SharingAction
          icon={(params) => <InstagramIcon {...params} />}
          label="Download story (image)"
          style={{ width: "100%", justifyContent: "flex-start", padding: 0 }}
        />
      </a>
    </div>
  );
};
