import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  getRemotionEnvironment,
  staticFile,
} from "remotion";
import type { GradientType } from "./available-gradients";
import { availableGradients } from "./available-gradients";

type Props = {
  gradient: GradientType;
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
  const style = useMemo(() => {
    return { width: "100%", height: "100%" };
  }, []);

  return (
    <AbsoluteFill>
      <Img
        style={style}
        src={staticFile(`gradient/Gradients-${gradient}.png`)}
      />
    </AbsoluteFill>
  );
};

export const Gradient: React.FC<Props> = ({ gradient }) => {
  if (getRemotionEnvironment().isRendering) {
    return <ImageGradient gradient={gradient} />;
  }

  return <NativeGradient gradient={gradient} />;
};
