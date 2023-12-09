import { useNavigate } from "@tanstack/react-router";
import React, { useCallback, useEffect } from "react";
import { ShareIcon } from "../../icons/ShareIcon";
import { Button } from "../Button/Button";
import { useUserVideo } from "../context";
import { shareRoute, videoRoute } from "../routing";
import { FurtherActions } from "./Actions/FurtherActions";
import { DownloadButton } from "./Sidebar/DownloadButton";
import styles from "./styles.module.css";

export const MobileActionsContainer: React.FC<{ url: string | null }> = ({
  url,
}) => {
  const navigate = useNavigate({ from: videoRoute.id });
  const [file, setFile] = React.useState<File | null>(null);
  const { username } = videoRoute.useParams();
  const { compositionParams } = useUserVideo();

  const fetchFile = useCallback(async () => {
    if (url) {
      const f = await fetch(url)
        .then((res) => res.blob())
        .then(
          (blob) =>
            new File([blob], "github_unwrapped.mp4", { type: "video/mp4" }),
        );
      setFile(f);
    }
  }, [url]);

  useEffect(() => {
    fetchFile();
  }, [fetchFile]);

  return (
    <div className={styles.mobileActionsContainer}>
      <FurtherActions />

      <div style={{ display: "flex", gap: 16 }}>
        <DownloadButton style={{ flex: 1 }} />
        {/* <Button
          primary
          hoverEffect
          style={{
            flex: 1,
            gap: 8,
          }}
        >
          <DownloadIcon width={20} color="white" />
          Download
        </Button> */}
        <Button
          hoverEffect
          style={{ flex: 1, gap: 8 }}
          onClick={() => {
            const sharable = Boolean(navigator.share);
            if (sharable && file) {
              navigator.share({
                files: [file],
                title: "Your GitHub Unwrapped 2023",
                text: "Check out my GitHub Unwrapped 2023! Get yours now on https://githubunwrapped.com",
              });
            } else {
              navigate({
                to: shareRoute.id,
                params: { username },
                search: {
                  platform: undefined,
                  accentColor: compositionParams.accentColor,
                },
              });
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
