import {
  evolvePath,
  getBoundingBox,
  getLength,
  getPointAtLength,
  translatePath,
} from "@remotion/paths";
import { makeCircle } from "@remotion/shapes";
import {
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TIME_INBETWEEN_STARS } from ".";

const descriptionPath =
  "M0.599976 136.5C0.599976 136.5 76.6 153.6 158.2 68.2002C222.7 0.700195 314.8 0.700195 314.8 0.700195H626.9H801.2C801.2 0.700195 883.8 0.700195 957.8 68.2002C1026.4 130.8 1115.4 136.5 1115.4 136.5";

const length = getLength(descriptionPath);
const point = getPointAtLength(descriptionPath, length * 0.5);
const boundingBox = getBoundingBox(descriptionPath);

export const DESCRIPTION_SEQUENCE_DURATION = 120;

export const Description: React.FC<{ starsReceived: number }> = ({
  starsReceived,
}) => {
  const sequenceDelay = starsReceived * TIME_INBETWEEN_STARS;
  const frame = useCurrentFrame();
  const sequenceFrame = frame - sequenceDelay;
  const { fps } = useVideoConfig();

  const drawProgress = interpolate(sequenceFrame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const eraseProgress = interpolate(sequenceFrame, [60, 90], [-1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const descriptionEnterOpacity = spring({
    fps,
    frame: sequenceFrame,
    delay: 35,
    config: { stiffness: 200, damping: 200 },
  });

  const descriptionExitOpacity = spring({
    fps,
    frame: sequenceFrame,
    delay: 75,
    config: { stiffness: 200, damping: 200 },
  });

  const evolution = evolvePath(
    sequenceFrame < 60 ? drawProgress : eraseProgress,
    descriptionPath,
  );

  return (
    <Sequence
      name="Description"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 48,
      }}
      from={sequenceDelay}
    >
      <div
        style={{
          color: "white",
          fontSize: 72,
          fontFamily: "Mona Sans",
          fontWeight: 800,
          opacity: descriptionEnterOpacity - descriptionExitOpacity,
        }}
      >
        {starsReceived} stars received
      </div>
      <svg
        viewBox={`0 0 ${boundingBox.width} ${boundingBox.height}`}
        style={{
          width: 600,
          overflow: "visible",
        }}
      >
        <path
          stroke="white"
          strokeWidth={4}
          d={descriptionPath}
          fill="transparent"
          strokeDasharray={evolution.strokeDasharray}
          strokeDashoffset={evolution.strokeDashoffset}
        />
        <path
          d={translatePath(
            makeCircle({ radius: 48 }).path,
            point.x - 48,
            point.y - 48,
          )}
          fill="rgb(14,12,39)"
          stroke="white"
          strokeWidth={4}
          style={{
            opacity: descriptionEnterOpacity - descriptionExitOpacity,
          }}
        />
      </svg>
    </Sequence>
  );
};
