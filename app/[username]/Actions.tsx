"use client";

import { useRouter } from "next/navigation";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { UserIcon } from "../../icons/UserIcon";
import { XIcon } from "../../icons/XIcon";
import { Action } from "./Action";

const actionsWrapper: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

export const Actions: React.FC = () => {
  const router = useRouter();

  return (
    <div style={actionsWrapper}>
      <Action
        icon={(params) => <XIcon {...params} />}
        label={"Post #GitHubUnwrapped"}
        onClick={() => {
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              "This is my #GitHubUnwrapped! Get your own: https://www.githubunwrapped.com\n\n[Delete this placeholder, download and drag your MP4 video in here]"
            )}`
          );
        }}
      />
      <Action
        icon={(params) => <LinkedInIcon {...params} />}
        label="Share to LinkedIn Network"
        onClick={() => window.open("https://www.linkedin.com/")}
      />
      <Action
        icon={(params) => <UserIcon {...params} />}
        label="Unwrapp another user"
        onClick={() => router.push("/")}
      />
    </div>
  );
};
