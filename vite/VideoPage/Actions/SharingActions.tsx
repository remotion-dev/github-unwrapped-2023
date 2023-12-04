import { LinkedInIcon } from "../../../icons/LinkedInIcon";
import { XIcon } from "../../../icons/XIcon";
import { SharingAction } from "./SharingAction";
import styles from "./styles.module.css";

export const SharingActions: React.FC = () => {
  return (
    <div className={styles.sharingActionsWrapper}>
      <SharingAction
        icon={(params) => <XIcon {...params} />}
        label={"Post #GitHubUnwrapped"}
        onClick={() => {
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              "This is my #GitHubUnwrapped! Get your own: https://www.githubunwrapped.com\n\n[Delete this placeholder, download and drag your MP4 video in here]",
            )}`,
          );
        }}
      />
      <SharingAction
        icon={(params) => <LinkedInIcon {...params} />}
        label="Share on LinkedIn"
        onClick={() => window.open("https://www.linkedin.com/")}
      />
    </div>
  );
};
