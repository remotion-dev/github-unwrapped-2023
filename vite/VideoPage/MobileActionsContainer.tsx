import { Pie } from "@remotion/shapes";
import { useNavigate } from "@tanstack/react-router";
import React, { useCallback } from "react";
import { ShareIcon } from "../../icons/ShareIcon";
import { Button } from "../Button/Button";
import { useUserVideo } from "../context";
import { shareRoute, videoRoute } from "../routing";
import { FurtherActions } from "./Actions/FurtherActions";
import type { LoadingState } from "./Sidebar/DownloadButton";
import { DownloadButton } from "./Sidebar/DownloadButton";
import styles from "./styles.module.css";
import type { RenderStatus } from "./useVideo";

const getRenderDescription = (status: RenderStatus) => {
  switch (status.type) {
    case "querying":
      return <div>Initializing Render...</div>;
    case "render-running":
      return (
        <div>{`Generating Video... (${Math.floor(
          status.progress * 100,
        )}%)`}</div>
      );
    case "error-querying":
      return <div>An error occured</div>;
    case "video-available":
      return null;
    default:
      return null;
  }
};

export const MobileActionsContainer: React.FC<{
  loadingState: LoadingState;
}> = ({ loadingState }) => {
  const navigate = useNavigate({ from: videoRoute.id });

  const { username } = videoRoute.useParams();
  const { compositionParams } = useUserVideo();
  const { status } = useUserVideo();

  // const status: {
  //   type: "render-running";
  //   renderId: string;
  //   progress: number;
  // } = {
  //   type: "render-running",
  //   renderId: "",
  //   progress: 0.47,
  // };

  const goToFallbackSharePage = useCallback(() => {
    navigate({
      to: shareRoute.id,
      params: { username },
      search: {
        platform: undefined,
        accentColor: compositionParams.accentColor,
      },
    });
  }, [compositionParams.accentColor, navigate, username]);

  const handleClick = useCallback(() => {
    if (loadingState.type !== "downloaded") {
      goToFallbackSharePage();
      return;
    }

    const sharableContent = {
      files: [loadingState.file],
      title: "Your GitHub Unwrapped 2023",
      text: "Check out my #GitHubUnwrapped 2023! Get yours now on https://githubunwrapped.com",
    };
    const sharable = navigator.canShare && navigator.canShare(sharableContent);
    if (!sharable) {
      goToFallbackSharePage();
      return;
    }

    navigator.share(sharableContent);
  }, [loadingState, goToFallbackSharePage]);

  return (
    <div className={styles.mobileActionsContainer}>
      {status.type === "video-available" && <FurtherActions />}

      {getRenderDescription(status)}

      <div style={{ display: "flex", gap: 16 }}>
        <DownloadButton style={{ flex: 1 }} />
        <Button
          disabled={status.type !== "video-available"}
          hoverEffect
          style={{ flex: 1, gap: 8 }}
          onClick={handleClick}
        >
          {loadingState.type === "downloading" ? (
            <Pie
              radius={10}
              fill="none"
              closePath={false}
              progress={loadingState.progress}
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
            />
          ) : null}
          <ShareIcon width={20} color="white" />
          Share
        </Button>
      </div>
    </div>
  );
};
