import React, { useMemo } from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
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

const Orbs = [
  Orb1,
  Orb2,
  Orb3,
  Orb4,
  Orb5,
  Orb6,
  Orb7,
  Orb8,
  Orb9,
  Orb10,
  Orb11,
];

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
      {props.thread.orbs.map((orb, j) => {
        return (
          <AbsoluteFill
            // eslint-disable-next-line react/no-array-index-key
            key={j}
            style={{ top: orb.top, transform: `scale(${props.thread.size})` }}
          >
            {Orbs[orb.type - 1]({})}
          </AbsoluteFill>
        );
      })}
    </div>
  );
};

export const Threads: React.FC = () => {
  const threads: Array<ThreadT> = useMemo(
    () =>
      new Array(10).fill(0).map((_, i) => {
        const left = random(i + "left") * 60 + 120 * i;

        return {
          left,
          speed: random(i + "speed") * (THREAD_SPEED / 2) + THREAD_SPEED,
          size: Number(random(i + "size")) + 0.3,
          // eslint-disable-next-line @typescript-eslint/no-shadow
          orbs: new Array(12).fill(0).map((_, j) => ({
            top: random(i + "top") * 100 + 250 * j,
            type: Math.floor(random(i + "type") * 11) + 1,
          })),
        };
      }),
    [],
  );

  return (
    <>
      {threads.map((thread, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Thread key={i} thread={thread} />
      ))}
    </>
  );
};
