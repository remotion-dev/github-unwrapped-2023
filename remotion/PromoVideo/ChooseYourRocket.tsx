import { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { Rocket } from "../../src/config";
import { TakeOff, takeOffSpeedFucntion } from "../Opening/TakeOff";
import { remapSpeed } from "../TopLanguages/remap-speed";
import type { PromoVideoLayout } from "./promo-video-layout";

export const ChooseYourRocket: React.FC<{
  layout: PromoVideoLayout;
}> = ({ layout }) => {
  const frame = useCurrentFrame();

  const acceleratedFrame = remapSpeed(frame, takeOffSpeedFucntion);

  const translateX = interpolate(acceleratedFrame, [0, 100], [0, -100]);

  const color = useMemo((): Rocket => {
    if (frame < 30) {
      return "blue";
    }

    if (frame < 60) {
      return "orange";
    }

    return "yellow";
  }, [frame]);

  return (
    <AbsoluteFill style={{ scale: "0.5" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${interpolate(frame, [0, 100], [1, 1.2])})`,
        }}
      >
        <div
          style={{
            color: "white",
            fontFamily: "Mona Sans",
            fontWeight: "bold",
            position: "absolute",
          }}
        >
          <AbsoluteFill style={{ width: 1080, height: 1080, marginLeft: -570 }}>
            <TakeOff rocket={color} />
          </AbsoluteFill>
        </div>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Mona Sans",
              fontWeight: "bold",
              fontSize: layout === "short" ? 120 : 90,
              color: "white",
              textAlign: "center",
              backgroundClip: "text",
              backgroundImage:
                "linear-gradient(270.02deg, #bbb 20.63%, #fff 99.87%)",
              WebkitBackgroundClip: "text",
              backgroundColor: "text",
              WebkitTextFillColor: "transparent",
              marginTop: 100,
              transform: `translateY(${translateX}px)`,
            }}
          >
            Choose your
            <br />
            rocket
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
