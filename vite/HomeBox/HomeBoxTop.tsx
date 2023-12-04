import React from "react";
import { GithubIcon } from "../../icons/GithubIcon";
import { RocketIcon } from "../../icons/RocketIcon";
import boxStyles from "../Box/styles.module.css";
import { HomeLink } from "../HomeLink";
import gradientStyles from "../styles.module.css";

export const HomeBoxTop: React.FC = () => {
  return (
    <div className={boxStyles.headerTopContainer}>
      <h2
        style={{ fontSize: 18, marginLeft: 7 }}
        className={gradientStyles.gradientText2}
      >
        #GitHubUnwrapped
      </h2>
      <div className={boxStyles.linkContainer}>
        <HomeLink
          href={"https://github.com/remotion-dev/github-unwrapped-2023"}
          label={"Source Code"}
          icon={(props) => <GithubIcon {...props} />}
        />
        <HomeLink
          href={"/about"}
          label={"About this project"}
          icon={(props) => <RocketIcon {...props} />}
        />
      </div>
    </div>
  );
};
