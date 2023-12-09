import React, { useEffect, useState } from "react";
import { AbsoluteFill } from "remotion";
import { prefetchAllAssets } from "../../../remotion/prefetch-all-assets";
import type { Planet, Rocket, TopLanguage } from "../../../src/config";
import { PlayButton } from "./PlayButton";

export const PlayState: React.FC<{
  isPlaying: boolean;
  onClickPlayButton: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClickPauseButton: () => void;
  props: {
    rocket: Rocket;
    planetType: Planet;
    durationInFrames: number;
    language1: TopLanguage | null;
    language2: TopLanguage | null;
    language3: TopLanguage | null;
    login: string;
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
        return setProgress(loadingProgress);
      },
      planetType: props.planetType,
      durationInFrames: props.durationInFrames,
      language1: props.language1,
      language2: props.language2,
      language3: props.language3,
    });
  }, [
    props.durationInFrames,
    props.language1,
    props.language2,
    props.language3,
    props.planetType,
    props.rocket,
  ]);

  if (isPlaying) {
    return <AbsoluteFill onClick={onClickPauseButton} />;
  }

  return <PlayButton onPlay={onClickPlayButton} progress={progress} />;
};
