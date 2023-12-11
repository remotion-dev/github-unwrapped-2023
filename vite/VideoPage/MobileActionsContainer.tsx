import { useNavigate } from "@tanstack/react-router";
import React, { useCallback, useEffect } from "react";
import { ShareIcon } from "../../icons/ShareIcon";
import { Button } from "../Button/Button";
import { useUserVideo } from "../context";
import { shareRoute, videoRoute } from "../routing";
import { FurtherActions } from "./Actions/FurtherActions";
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

type LoadingState =
  | {
      type: "no-file";
    }
  | {
      type: "downloading";
      progress: number;
    }
  | {
      type: "downloaded";
      file: File;
    };

export const MobileActionsContainer: React.FC = () => {
  const navigate = useNavigate({ from: videoRoute.id });
  const [file, setFile] = React.useState<LoadingState>({ type: "no-file" });
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

  const fetchFile = useCallback(async () => {
    if (status.type !== "video-available") {
      setFile({ type: "no-file" });
      return;
    }

    const response = await fetch(status.url);
    const contentLength = Number(
      response.headers.get("Content-Length") as string,
    );

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();

    let receivedLength = 0;
    const chunks = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      setFile({
        type: "downloading",
        progress: receivedLength / contentLength,
      });
      console.log(`Received ${receivedLength} of ${contentLength}`);
    }

    const chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (const chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }

    const downloadedFile = new File([chunksAll], "github_unwrapped.mp4", {
      type: "video/mp4",
    });

    setFile({ type: "downloaded", file: downloadedFile });
  }, [status]);

  useEffect(() => {
    fetchFile();
  }, [fetchFile]);

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
    if (file.type !== "downloaded") {
      goToFallbackSharePage();
      return;
    }

    const sharableContent = {
      files: [file.file],
      title: "Your GitHub Unwrapped 2023",
      text: "Check out my #GitHubUnwrapped 2023! Get yours now on https://githubunwrapped.com",
    };
    const sharable = navigator.canShare && navigator.canShare(sharableContent);
    if (!sharable) {
      goToFallbackSharePage();
      return;
    }

    navigator.share(sharableContent);
  }, [file, goToFallbackSharePage]);

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
          <ShareIcon width={20} color="white" />
          Share
        </Button>
      </div>
    </div>
  );
};
