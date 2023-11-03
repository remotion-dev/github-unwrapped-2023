"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "../../components/Button/Button";
import { DownloadIcon } from "../../icons/DownloadIcon";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { RocketIcon } from "../../icons/RocketIcon";
import { UserIcon } from "../../icons/UserIcon";
import { XIcon } from "../../icons/XIcon";
import { Main } from "../../remotion/MyComp/Main";
import {
  CompositionProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { GradientBox } from "../GradientBox";
import { Action } from "./Action";
import styles from "./styles.module.css";

const wrapper: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundImage: 'url("/background2.png")',
  backgroundPosition: "center",
  backgroundSize: "cover",
  position: "relative",
};

const content: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const player: React.CSSProperties = {
  width: "100%",
};

const playerPlaceholder: React.CSSProperties = {
  width: 450,
  height: 450,
  borderRadius: 3,
  border: "1px solid rgba(0, 169, 157, 1)",
  overflow: "hidden",
};

const main: React.CSSProperties = {
  display: "flex",
  gap: 48,
};

const information: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 24,
};

const title: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const actionsWrapper: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const downloadContent: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const videoSize: React.CSSProperties = {
  color: "rgba(211, 211, 211, 1)",
  fontSize: 14,
  fontWeight: 500,
};

const Home: NextPage<{ params: { username: string } }> = ({ params }) => {
  const [text, setText] = useState<string>(params.username);

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
    };
  }, [text]);

  return (
    <div style={wrapper}>
      <div style={content}>
        <GradientBox>
          <div style={main}>
            <div style={playerPlaceholder}>
              <Player
                component={Main}
                inputProps={inputProps}
                durationInFrames={DURATION_IN_FRAMES}
                fps={VIDEO_FPS}
                compositionHeight={VIDEO_HEIGHT}
                compositionWidth={VIDEO_WIDTH}
                style={player}
                controls
                autoPlay
                loop
              />
            </div>
            <div style={information}>
              <div style={title}>
                <h2 className={styles.gradientText} style={{ margin: 0 }}>
                  #GitHubUnwrapped 2023
                </h2>
                <h2 style={{ margin: 0 }}>@{params.username}</h2>
              </div>
              <div style={downloadContent}>
                <Button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                    alignItems: "center",
                    fontWeight: 700,
                  }}
                >
                  Download Video <DownloadIcon width={20} color="white" />
                </Button>
                <div style={videoSize}>This MP4 has 11.4 MB.</div>
              </div>
              <div style={actionsWrapper}>
                <Action
                  icon={(params) => <XIcon {...params} />}
                  label={"Post #GitHubUnwrapped"}
                />
                <Action
                  icon={(params) => <LinkedInIcon {...params} />}
                  label="Share to LinkedIn Network"
                />
                <Action
                  icon={(params) => <UserIcon {...params} />}
                  label="Unwrapp another user"
                />
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <RocketIcon />
            How we made Unwrapped
          </div>
        </GradientBox>
      </div>
    </div>
  );
};

export default Home;
