import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  getRemotionEnvironment,
  staticFile,
  useVideoConfig,
} from "remotion";
import { availableGradients } from "./available-gradients";

type Props = {
  gradient: keyof typeof availableGradients;
};

export const NativeGradient: React.FC<Props> = ({ gradient }) => {
  const style: React.CSSProperties = useMemo(() => {
    return {
      backgroundImage: availableGradients[gradient],
    };
  }, [gradient]);

  return <AbsoluteFill style={style} />;
};

const ImageGradient: React.FC<Props> = ({ gradient }) => {
  const { width, height } = useVideoConfig();

  const style = useMemo(() => {
    return { width, height };
  }, [height, width]);

  return (
    <AbsoluteFill>
      <Img style={style} src={staticFile(`gradient/${gradient}.png`)} />
    </AbsoluteFill>
  );
};

export const Gradient: React.FC<Props> = ({ gradient }) => {
  if (getRemotionEnvironment().isRendering) {
    return <ImageGradient gradient={gradient} />;
  }

  return <NativeGradient gradient={gradient} />;
};
