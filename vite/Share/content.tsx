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

const step1Content = {
  step: 1,
  title: "Download your video",
  description: "If you haven't already, download your video.",
  node: <DownloadButton style={{ width: 240 }} />,
};

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

export const useShareContent = (
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
            "Select your video or drag and drop your video from your Downloads folder",
        },
      ];
    }
  }
};
