import React, { useEffect, useState } from "react";
import { AbsoluteFill } from "remotion";
import { prefetchAllAssets } from "../../../remotion/prefetch-all-assets";
import type { Planet, Rocket } from "../../../src/config";
import { PlayButton } from "./PlayButton";
import { PrefetchProgress } from "./PrefetchProgress";

export const PlayState: React.FC<{
  isPlaying: boolean;
  onClickPlayButton: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClickPauseButton: () => void;
  props: {
    rocket: Rocket;
    planetType: Planet;
  };
}> = ({ isPlaying, onClickPauseButton, onClickPlayButton, props }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    prefetchAllAssets({
      rocket: props.rocket,
      onError: (e) => {
        // TODO: Handle error
        console.error(e);
      },
      onProgress: (loadingProgress) => {
        console.log(loadingProgress);
        return setProgress(loadingProgress);
      },
      planetType: props.planetType,
    });
  }, [props.planetType, props.rocket]);

  if (isPlaying) {
    return <AbsoluteFill onClick={onClickPauseButton} />;
  }

  if (progress < 1) {
    return <PrefetchProgress progress={progress} />;
  }

  return <PlayButton onPlay={onClickPlayButton} />;
};
