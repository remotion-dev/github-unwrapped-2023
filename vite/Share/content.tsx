import { useState } from "react";
import { CheckmarkIcon } from "../../icons/CheckmarkIcon";
import { CopyIcon } from "../../icons/CopyIcon";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { XIcon } from "../../icons/XIcon";
import type { AboutItemContent } from "../About/content";
import { SharingAction } from "../VideoPage/Actions/SharingAction";
import {
  linkedInSharingLink,
  twitterSharingLink,
} from "../VideoPage/Actions/SharingActions";
import { DownloadButton } from "../VideoPage/Sidebar/DownloadButton";
import styles from "./styles.module.css";

const exampleDescription =
  "This is my #GitHubUnwrapped! Get your own: https://githubunwrapped.com";

const CopyDescriptionButton = () => {
  const [copied, setCopied] = useState(false);

  return (
    <SharingAction
      icon={(params) =>
        copied ? <CheckmarkIcon {...params} /> : <CopyIcon {...params} />
      }
      label={copied ? "Copied" : "Copy Example Description"}
      onClick={async () => {
        await navigator.clipboard.writeText(exampleDescription);

        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      }}
    />
  );
};

const ShareToXButton = () => {
  return (
    <SharingAction
      icon={(params) => <XIcon {...params} />}
      label={"Open X.com"}
      className={styles.sharePageButton}
      onClick={() => {
        window.open(twitterSharingLink);
      }}
    />
  );
};

const ShareToLinkedinButton = () => {
  return (
    <SharingAction
      icon={(params) => <LinkedInIcon {...params} />}
      label={"Open LinkedIn"}
      className={styles.sharePageButton}
      onClick={() => {
        window.open(linkedInSharingLink);
      }}
    />
  );
};

export const useShareContent = (
  platform: "linkedin" | "twitter" | undefined,
): AboutItemContent[] => {
  const step1Content = {
    step: 1,
    title: "Download your video",
    description: "If you haven't already, download your video.",
    node: <DownloadButton className={styles.sharePageButton} />,
  };

  switch (platform) {
    case "linkedin": {
      return [
        step1Content,
        {
          step: 2,
          title: "Navigate to your LinkedIn profile and start a new post",
          node: <ShareToLinkedinButton />,
        },
        {
          step: 3,
          title: "Upload your video and add a description",
          node: <CopyDescriptionButton />,
        },
      ];
    }

    case "twitter": {
      return [
        step1Content,
        {
          step: 2,
          title: "Navigate to your X.com profile and start a new post",
          node: <ShareToXButton />,
        },
        {
          step: 3,
          title: "Upload your video",
          description:
            "Select your video or drag and drop your video from your Downloads folder.",
        },
      ];
    }

    default: {
      return [
        step1Content,
        {
          step: 2,
          title: "Navigate to your social profile and start a new post",
          node: (
            <div className={styles.sharePageSocialsContainer}>
              <ShareToLinkedinButton />
              <ShareToXButton />
            </div>
          ),
        },
        {
          step: 3,
          title: "Upload your video and add a caption",
          description:
            "Select your video or drag and drop your video from your Downloads folder",
        },
      ];
    }
  }
};
