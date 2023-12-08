import { useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { CheckmarkIcon } from "../../icons/CheckmarkIcon";
import { CopyIcon } from "../../icons/CopyIcon";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { XIcon } from "../../icons/XIcon";
import { AboutItem } from "../About/AboutItem";
import { DesktopHeader } from "../About/DesktopHeader";
import { MobileHeader } from "../About/MobileHeader";
import type { AboutItemContent } from "../About/content";
import styles from "../About/styles.module.css";
import { Stars } from "../Home/Stars";
import { RadialGradient } from "../RadialGradient";
import { SharingAction } from "../VideoPage/Actions/SharingAction";
import {
  linkedInSharingLink,
  twitterSharingLink,
} from "../VideoPage/Actions/SharingActions";
import { DownloadButton } from "../VideoPage/Sidebar/DownloadButton";
import { userShare } from "../routing";

const exampleDescription =
  "This is my #GitHubUnwrapped! Get your own: https://www.githubunwrapped.com";

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

const headerProps = {
  description:
    "Follow these instructions to share your GitHub Unwrapped 2023 video.",
  title: "How to Share",
};

const step1Content = {
  step: 1,
  title: "Download your video",
  description: "If you haven't already, download your video.",
  node: (
    <DownloadButton
      url={null}
      error={false}
      progress={0}
      style={{ width: 240 }}
    />
  ),
};

const content = (
  platform: "linkedin" | "twitter" | undefined,
): AboutItemContent[] => {
  switch (platform) {
    case "linkedin": {
      return [
        step1Content,
        {
          step: 2,
          title: "Navigate to your LinkedIn profile and start a new post",
          node: (
            <SharingAction
              icon={(params) => <LinkedInIcon {...params} />}
              label={"Open LinkedIn"}
              onClick={() => {
                window.open(linkedInSharingLink);
              }}
            />
          ),
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
          node: (
            <SharingAction
              icon={(params) => <XIcon {...params} />}
              label={"Open X.com"}
              onClick={() => {
                window.open(twitterSharingLink);
              }}
            />
          ),
        },
        {
          step: 3,
          title: "Upload your video",
          description:
            "Select your unwrapped or drag and drop your video from your downloads folder.",
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
            <div style={{ display: "flex", gap: 16 }}>
              <SharingAction
                icon={(params) => <LinkedInIcon {...params} />}
                label={"Open LinkedIn"}
                onClick={() => {
                  window.open(linkedInSharingLink);
                }}
              />
              <SharingAction
                icon={(params) => <XIcon {...params} />}
                label={"Open X.com"}
                onClick={() => {
                  window.open(twitterSharingLink);
                }}
              />
            </div>
          ),
        },
        {
          step: 3,
          title: "Upload your video and add a caption",
          description:
            "Select your unwrapped or drag and drop your video from your downloads folder",
        },
      ];
    }
  }
};

export const SharePage = () => {
  const { platform } = useSearch({ from: userShare.id });

  return (
    <div className={styles.wrapper}>
      <RadialGradient />
      <Stars />
      <div className={styles.contentWrapper}>
        <MobileHeader {...headerProps} />
        <DesktopHeader {...headerProps} />
        <div className={styles.content}>
          {content(platform).map((item) => (
            <AboutItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
