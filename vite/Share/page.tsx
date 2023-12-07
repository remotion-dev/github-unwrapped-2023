import { useSearch } from "@tanstack/react-router";
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

const headerProps = {
  description:
    "Follow these instructions to share your GitHub Unwrapped 2023 video.",
  title: "How to Share",
};

const content = (platform: "linkedin" | "twitter"): AboutItemContent[] => [
  {
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
  },
  platform === "linkedin"
    ? {
        step: 2,
        title: "Navigate to your LinkedIn profile",
        description: "If you haven't already, download your video.",
        node: (
          <SharingAction
            icon={(params) => <LinkedInIcon {...params} />}
            label={"Open LinkedIn"}
            onClick={() => {
              window.open(linkedInSharingLink);
            }}
          />
        ),
      }
    : {
        step: 2,
        title: "Navigate to your Twitter profile",
        description: "If you haven't already, download your video.",
        node: (
          <SharingAction
            icon={(params) => <XIcon {...params} />}
            label={"Open Twitter"}
            onClick={() => {
              window.open(twitterSharingLink);
            }}
          />
        ),
      },
  platform === "linkedin"
    ? {
        step: 3,
        title: "Create a new post",
        description:
          "Drag and drop your video from your downloads folder and add a caption.",
      }
    : {
        step: 3,
        title: "Create a new post",
        description:
          "Drag and drop your video from your downloads folder and add a caption",
      },
];

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
