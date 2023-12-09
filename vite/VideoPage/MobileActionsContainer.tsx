import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { DownloadIcon } from "../../icons/DownloadIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { Button } from "../Button/Button";
import { FurtherActions } from "./Actions/FurtherActions";
import styles from "./styles.module.css";

export const MobileActionsContainer: React.FC<{ url: string | null }> = ({
  url,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.mobileActionsContainer}>
      <FurtherActions />

      <div style={{ display: "flex", gap: 16 }}>
        <Button
          style={{
            flex: 1,
            gap: 8,
            height: 48,
            backgroundColor: "rgba(80, 126, 255, 1)",
            border: "none",
          }}
        >
          <DownloadIcon width={20} color="white" />
          Download
        </Button>
        <Button
          style={{ flex: 1, gap: 8, height: 48 }}
          onClick={() => {
            const sharable = Boolean(navigator.share);
            if (sharable && url) {
              fetch(url)
                .then((res) => res.blob())
                .then((blob) => {
                  const file = new File([blob], "github_unwrapped.mp4", {
                    type: "video/mp4",
                  });
                  return navigator.share({
                    files: [file],
                    title: "Your GitHub Unwrapped 2023",
                    text: "Check out my GitHub Unwrapped 2023! Get yours now on https://githubunwrapped.com",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  // @ts-expect-error
                  navigate({ to: "./share" });
                });
            } else {
              // @ts-expect-error
              navigate({ to: "./share" });
            }
          }}
        >
          <ShareIcon width={20} color="white" />
          Share
        </Button>
      </div>
    </div>
  );
};
