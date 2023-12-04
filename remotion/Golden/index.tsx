import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { VIDEO_FPS } from "../../types/constants";
import Spaceship from "./Spaceship";
import Orb1 from "./orbs/orb1";
import Orb10 from "./orbs/orb10";
import Orb11 from "./orbs/orb11";
import Orb2 from "./orbs/orb2";
import Orb3 from "./orbs/orb3";
import Orb4 from "./orbs/orb4";
import Orb5 from "./orbs/orb5";
import Orb6 from "./orbs/orb6";
import Orb7 from "./orbs/orb7";
import Orb8 from "./orbs/orb8";
import Orb9 from "./orbs/orb9";

const THREAD_SPEED = 300;

const Orbs: any = {
  1: Orb1,
  2: Orb2,
  3: Orb3,
  4: Orb4,
  5: Orb5,
  6: Orb6,
  7: Orb7,
  8: Orb8,
  9: Orb9,
  10: Orb10,
  11: Orb11,
};

type ThreadT = {
  left: number;
  size: number;
  speed: number;
  orbs: Array<{ top: number; type: number }>;
};

const Thread = (props: { thread: ThreadT }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: props.thread.left,
        top: -(frame / props.thread.speed) * 1200,
        height: 200,
      }}
    >
      {props.thread.orbs.map((orb, j) => (
        <AbsoluteFill
          key={j}
          style={{ top: orb.top, transform: `scale(${props.thread.size})` }}
        >
          {Orbs[orb.type]()}
        </AbsoluteFill>
      ))}
    </div>
  );
};

export const GoldenScene: React.FC = () => {
  const frame = useCurrentFrame();

  const threads: Array<ThreadT> = useMemo(
    () =>
      new Array(12).fill(0).map((_, i) => {
        const left = Math.random() * 60 + 100 * i;

        return {
          left,
          speed: Math.random() * (THREAD_SPEED / 2) + THREAD_SPEED,
          size: Math.random() * 0.5 + 0.7,
          orbs: new Array(12).fill(0).map((_, j) => ({
            top: Math.random() * 100 + 250 * j,
            type: Math.floor(Math.random() * 11) + 1,
          })),
        };
      }),
    [],
  );

  const gradient = spring({
    fps: VIDEO_FPS,
    frame: frame / 6,
    config: {
      damping: 200,
    },
  });

  const planet = spring({
    fps: VIDEO_FPS,
    frame: frame / 12,
    config: {
      damping: 200,
    },
  });

  const channel = spring({
    fps: VIDEO_FPS,
    frame: frame,
    delay: 30,
    config: {
      damping: 200,
    },
  });

  const starship = spring({
    fps: VIDEO_FPS,
    frame: frame / 9,
    delay: 0,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
        }}
      >
        <AbsoluteFill style={{ background: "black" }}></AbsoluteFill>

        <AbsoluteFill
          style={{
            top: gradient * 800 - 800,
            left: gradient * 800 - 800,
          }}
        >
          <img src={staticFile("gold-gradient-bg.png")} />
        </AbsoluteFill>

        {threads.map((thread, i) => (
          <Thread thread={thread} key={i} />
        ))}

        <div
          style={{
            opacity: channel,
            position: "absolute",
            left: 410,
            top: -1000 + 1000 * channel,
            width: 240,
            height: "100%",
            background: "rgba(255,255,255,0.05)",
          }}
        ></div>

        <Img
          src={staticFile("golden-planet.png")}
          style={{
            width: 900,
            position: "absolute",
            bottom: -300 + 200 * planet,
            left: 85,
          }}
        />

        <AbsoluteFill
          style={{
            position: "absolute",
            left: 330,
          }}
        >
          <div
            style={{
              width: 400,
              position: "relative",
              top: -600 + 1150 * starship,
            }}
          >
            <Spaceship />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
