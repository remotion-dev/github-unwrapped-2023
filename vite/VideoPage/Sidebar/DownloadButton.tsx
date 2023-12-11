import React, { useEffect, useState } from "react";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import { Button } from "../../Button/Button";
import { HoverEffect } from "../../Button/HoverEffect";
import { useUserVideo } from "../../context";
import styles from "./styles.module.css";

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

const useWindowDimensions = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowSize;
};

const WINDOW_WIDTH_THRESHOLD = 640;

export type LoadingState =
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

export const DownloadButton: React.FC<{
  style?: React.CSSProperties;
  className?: string;
}> = ({ style, ...props }) => {
  const { status, loadingState } = useUserVideo();
  // const status: {
  //   type: "render-running";
  //   renderId: string;
  //   progress: number;
  // } = {
  //   type: "render-running",
  //   renderId: "",
  //   progress: 0.47,
  // };

  const { innerWidth } = useWindowDimensions();

  const classNames = [styles.downloadButton];

  if (props.className) {
    classNames.push(props.className);
  }

  if (innerWidth < WINDOW_WIDTH_THRESHOLD) {
    return (
      <Button
        className={[
          ...classNames,
          status.type === "video-available" ? undefined : styles.loadingButton,
        ].join(" ")}
        disabled={loadingState.type !== "downloaded"}
        style={{
          pointerEvents: status.type === "video-available" ? "auto" : "none",
          ...style,
        }}
        onClick={() => {
          if (loadingState.type !== "downloaded") {
            throw new Error("cannot click on not downloaded");
          }

          window.open(
            URL.createObjectURL(loadingState.file),
            "_blank",
            "noopener noreferrer",
          );
        }}
      >
        {"progress" in status && (
          <div
            className={styles.loadingButtonBar}
            style={{ width: `${status.progress * 100}%`, zIndex: -1 }}
          />
        )}
        <DownloadIcon />
        Download
      </Button>
    );
  }

  if (status.type === "querying") {
    return (
      <Button
        className={classNames.join(" ")}
        style={{ pointerEvents: "none", ...style }}
      >
        <div
          style={{
            width: 100,
            height: 16,
            backgroundColor: "rgba(255, 255,255, 0.2)",
          }}
        />{" "}
      </Button>
    );
  }

  if (status.type === "render-error") {
    return (
      <Button
        className={classNames.join(" ")}
        style={{ pointerEvents: "none", ...style }}
      >
        Download unavailable
      </Button>
    );
  }

  if (status.type === "error-querying") {
    return (
      <Button
        className={classNames.join(" ")}
        style={{ pointerEvents: "none", ...style }}
      >
        Could not get video status
      </Button>
    );
  }

  if (status.type === "video-available") {
    return (
      <Button
        hoverEffect
        className={classNames.join(" ")}
        style={{ ...style }}
        onClick={() => {
          window.open(status.url, "_blank", "noopener noreferrer");
        }}
      >
        <HoverEffect />
        <DownloadIcon />
        Download Video
      </Button>
    );
  }

  return (
    <Button
      className={[...classNames, styles.loadingButton].join(" ")}
      style={{ pointerEvents: "none", ...style }}
    >
      <div
        className={styles.loadingButtonBar}
        style={{ width: `${status.progress * 100}%`, zIndex: -1 }}
      />
      {status.progress > 0 ? (
        <div>Generating video ({Math.round(status.progress * 100)}%)</div>
      ) : (
        <div>Generating video</div>
      )}
    </Button>
  );
};
