import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  random,
  staticFile,
  useCurrentFrame,
} from "remotion";
const THREAD_SPEED = 300;

type Orb = {
  source: string;
  width: number;
  height: number;
};

export const Orbs: Orb[] = [
  {
    source: staticFile("orb1.png"),
    width: 15,
    height: 15,
  },
  {
    source: staticFile("orb2.png"),
    width: 92 / 2,
    height: 542 / 2,
  },
  {
    source: staticFile("orb3.png"),
    width: 66 / 2,
    height: 298 / 2,
  },
  {
    source: staticFile("orb4.png"),
    width: 64 / 2,
    height: 304 / 2,
  },
  {
    source: staticFile("orb5.png"),
    width: 66 / 2,
    height: 472 / 2,
  },
  {
    source: staticFile("orb6.png"),
    width: 60 / 2,
    height: 130 / 2,
  },
  {
    source: staticFile("orb7.png"),
    width: 34 / 2,
    height: 192 / 2,
  },
  {
    source: staticFile("orb8.png"),
    width: 74 / 2,
    height: 402 / 2,
  },
  {
    source: staticFile("orb9.png"),
    width: 74 / 2,
    height: 402 / 2,
  },
  {
    source: staticFile("orb10.png"),
    width: 60 / 2,
    height: 58 / 2,
  },
  {
    source: staticFile("orb11.png"),
    width: 44 / 2,
    height: 90 / 2,
  },
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
        console.log(orb);
        return (
          <AbsoluteFill
            // eslint-disable-next-line react/no-array-index-key
            key={j}
            style={{ top: orb.top, transform: `scale(${props.thread.size})` }}
          >
            <Img
              src={Orbs[orb.type - 1].source}
              style={{
                width: Orbs[orb.type - 1].width,
                height: Orbs[orb.type - 1].height,
              }}
            />
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
