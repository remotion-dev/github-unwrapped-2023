import React from "react";
import { GithubIcon } from "../../icons/GithubIcon";
import { RocketIcon } from "../../icons/RocketIcon";
import { HomeLink } from "../HomeLink";
import { ACTION_ROW_PADDING } from "../VideoPage/BottomRow";
import styles from "./styles.module.css";

const container: React.CSSProperties = {
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  padding: ACTION_ROW_PADDING,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.03)",
};

export const HomeBoxTop: React.FC = () => {
  return (
    <div style={container}>
      <div className={styles.gradientText}>#GitHubUnwrapped</div>
      <div style={{ flex: 1 }} />
      <HomeLink
        href={"https://github.com/remotion-dev/github-unwrapped-2023"}
        label={"Source Code"}
        icon={(props) => <GithubIcon {...props} />}
      />
      <div style={{ width: 6 }} />
      <HomeLink
        href={"https://github.com/remotion-dev/github-unwrapped-2023"}
        label={"About"}
        icon={(props) => <RocketIcon {...props} />}
      />
    </div>
  );
};
