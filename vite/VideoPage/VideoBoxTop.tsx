import type { PlayerRef } from "@remotion/player";
import { Link } from "@tanstack/react-router";
import type { z } from "zod";
import { RocketIcon } from "../../icons/RocketIcon";
import type { Rocket, compositionSchema } from "../../src/config";
import boxStyles from "../Box/styles.module.css";
import { HomeLink } from "../HomeLink";
import gradientStyles from "../styles.module.css";
import { RocketPicker } from "./RocketSelection/RocketPicker";
import styles from "./styles.module.css";

export const VideoBoxTop: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
  rocket: Rocket;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: React.RefObject<PlayerRef>;
}> = ({ inputProps, rocket, setIsModalOpen, setIsPlaying, playerRef }) => {
  return (
    <div className={boxStyles.headerTopContainer} style={{ display: "flex" }}>
      <div className={styles.videoBoxTopDesktop}>
        <Link to={"/"}>
          <h2
            className={gradientStyles.gradientText2}
            style={{ fontSize: 18, marginLeft: 7 }}
          >
            #GitHubUnwrapped
          </h2>
        </Link>
        <div className={boxStyles.linkContainer}>
          <HomeLink
            href="/about"
            label="About this project"
            icon={(props) => <RocketIcon {...props} />}
          />
        </div>
      </div>
      <div className={styles.videoBoxTopMobile}>
        <RocketPicker
          rocket={rocket}
          setIsModalOpen={setIsModalOpen}
          setIsPlaying={setIsPlaying}
          playerRef={playerRef}
        />
        <div className={styles.videoBoxTopMobile}>{inputProps.login}</div>
      </div>
    </div>
  );
};
