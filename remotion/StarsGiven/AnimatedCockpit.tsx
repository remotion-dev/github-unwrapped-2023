import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { AccentColor } from "../../src/config";
import { PullRequests } from "../Paths/PullRequests";
import { SevenSegment } from "../SevenSegment/SevenSegmentNumber";
import CockpitSVG from "./CockpitSVG";
import { CockpitRightScreen } from "./CustomScreen";
import type { RepoText } from "./HeadsUpDisplay";
import { HeadsUpDisplay } from "./HeadsUpDisplay";
import { CockpitLeftScreen } from "./LeftScreenCockpit";

export const AnimatedCockpit: React.FC<{
  xShake: number;
  yShake: number;
  rotationShake: number;
  accentColor: AccentColor;
  totalPullRequests: number;
  repoText: RepoText | null;
  starCount: number;
  totalStarCount: number;
}> = ({
  xShake,
  yShake,
  rotationShake,
  accentColor,
  totalPullRequests,
  repoText,
  starCount,
  totalStarCount,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const entryProgress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  const distance = interpolate(entryProgress, [0, 1], [0.000000005, 1], {});
  const scaleDivided = 1 / distance;

  const shake: React.CSSProperties = useMemo(() => {
    return {
      scale: String(scaleDivided),
      transform: `rotate(${rotationShake}rad) scale(${
        // +0.05 so noise doesn't cut off
        scaleDivided + 0.05
      }) translate(${xShake}px, ${yShake}px)`,
    };
  }, [rotationShake, scaleDivided, xShake, yShake]);

  const fontSizeOfSevenSegmentDisplay = useMemo(() => {
    const digits = Number(totalStarCount).toString().length;
    if (digits === 1) {
      return 900;
    }

    if (digits === 2) {
      return 800;
    }

    if (digits === 3) {
      return 600;
    }

    return 500;
  }, [totalStarCount]);

  return (
    <AbsoluteFill style={shake}>
      <HeadsUpDisplay textToDisplay={repoText} />
      <CockpitSVG />
      <CockpitLeftScreen>
        <AbsoluteFill
          style={{
            backgroundColor: "#100714",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: 700,
            fontFamily: "Seven Segment",
          }}
        >
          <div style={{ position: "absolute" }}>
            <SevenSegment
              fontSize={fontSizeOfSevenSegmentDisplay}
              num={starCount}
              max={totalStarCount}
            />
          </div>
        </AbsoluteFill>
      </CockpitLeftScreen>
      <Sequence from={271}>
        <CockpitRightScreen>
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              fontSize: 400,
              color: "white",
              height: 1080,
              width: 1080,
              overflow: "hidden",
            }}
          >
            <PullRequests
              accentColor={accentColor}
              totalPullRequests={totalPullRequests}
            />
          </AbsoluteFill>
        </CockpitRightScreen>
      </Sequence>
    </AbsoluteFill>
  );
};
