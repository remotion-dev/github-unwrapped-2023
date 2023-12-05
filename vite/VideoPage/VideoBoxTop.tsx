import { Link } from "@tanstack/react-router";
import type { z } from "zod";
import { RocketIcon } from "../../icons/RocketIcon";
import type { compositionSchema } from "../../src/config";
import boxStyles from "../Box/styles.module.css";
import { HomeLink } from "../HomeLink";
import gradientStyles from "../styles.module.css";
import styles from "./styles.module.css";

export const VideoBoxTop: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
}> = ({ inputProps }) => {
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

        {/**
      // TODO: Add proper link
       */}
        <div className={boxStyles.linkContainer}>
          <HomeLink
            href="/about"
            label="About this project"
            icon={(props) => <RocketIcon {...props} />}
          />
        </div>
      </div>
      <div className={styles.videoBoxTopMobile}>@{inputProps.login}</div>
    </div>
  );
};
