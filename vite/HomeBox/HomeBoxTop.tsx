import React from "react";
import { GithubIcon } from "../../icons/GithubIcon";
import { RocketIcon } from "../../icons/RocketIcon";
import { HomeLink } from "../HomeLink";
import styles from "./styles.module.css";

export const HomeBoxTop: React.FC = () => {
  return (
    <div className={styles.headerTopContainer}>
      <div className={styles.gradientText}>#GitHubUnwrapped</div>
      <div className={styles.linkContainer}>
        <HomeLink
          href={"https://github.com/remotion-dev/github-unwrapped-2023"}
          label={"Source Code"}
          icon={(props) => <GithubIcon {...props} />}
        />
        <HomeLink
          href={"https://github.com/remotion-dev/github-unwrapped-2023"}
          label={"About"}
          icon={(props) => <RocketIcon {...props} />}
        />
      </div>
    </div>
  );
};
