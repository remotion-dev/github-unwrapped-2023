import { makeRect } from "@remotion/shapes";
import React, { useMemo, useRef } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const RemotionShineEffect: React.FC<{
  borderRadius: number;
  width: number;
  height: number;
  id: string;
}> = ({ borderRadius, width, height, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const linearGradient = useRef<SVGLinearGradientElement>(null);

  const svg = useMemo(() => {
    return makeRect({
      height,
      width,
      cornerRadius: borderRadius,
    });
  }, [borderRadius, height, width]);

  const frame = useCurrentFrame() + 117;
  const rotation = frame * 7;
  const gradientTransform = `rotate(${rotation} ${svg.width / 2} ${
    svg.height / 2
  })`;

  return (
    <AbsoluteFill ref={ref}>
      {svg ? (
        <svg
          style={{
            overflow: "visible",
            opacity: 0.7,
          }}
          preserveAspectRatio="none"
          viewBox={`0 0 ${svg.width} ${svg.height}`}
        >
          <defs>
            <linearGradient
              ref={linearGradient}
              gradientUnits="userSpaceOnUse"
              id={id}
              gradientTransform={gradientTransform}
            >
              <stop
                offset="50%"
                stopColor="rgba(255, 255,255, 0)"
                stopOpacity="1"
              />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill="none"
            d={svg.path}
            stroke={`url(#${id})`}
            strokeWidth={1}
          />
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};
