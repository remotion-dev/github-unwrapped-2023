import { PlayerInternals } from "@remotion/player";
import { makeRect } from "@remotion/shapes";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AbsoluteFill } from "remotion";

export const ShineEffect: React.FC<{
  borderRadius: number;
}> = ({ borderRadius }) => {
  const ref = useRef<HTMLDivElement>(null);
  const linearGradient = useRef<SVGLinearGradientElement>(null);
  const dimensions = PlayerInternals.useElementSize(ref, {
    triggerOnWindowResize: true,
    shouldApplyCssTransforms: false,
  });

  // eslint-disable-next-line @remotion/deterministic-randomness
  const [id] = useState(() => String(Math.random()));

  const svg = useMemo(() => {
    if (!dimensions) {
      return null;
    }

    return makeRect({
      height: dimensions.height,
      width: dimensions.width,
      cornerRadius: borderRadius,
    });
  }, [borderRadius, dimensions]);

  useEffect(() => {
    let rotation = 0;
    const loop = () => {
      rotation += 0.4;
      if (linearGradient.current && svg) {
        linearGradient.current.setAttribute(
          "gradientTransform",
          `rotate(${rotation} ${svg.width / 2} ${svg.height / 2})`,
        );
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }, [svg]);

  return (
    <AbsoluteFill ref={ref} style={{ pointerEvents: "none", opacity: 0.5 }}>
      {svg ? (
        <svg
          style={{
            overflow: "visible",
          }}
          preserveAspectRatio="none"
          viewBox={`0 0 ${svg.width} ${svg.height}`}
        >
          <defs>
            <linearGradient
              ref={linearGradient}
              gradientUnits="userSpaceOnUse"
              id={id}
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
