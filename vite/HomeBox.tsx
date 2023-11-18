import React, { useState } from "react";
import { GradientBox } from "./GradientBox/GradientBox";

import { LoginOptions } from "./LoginOptions";
import { Octocat } from "./Octocat";
import { UserNotFound } from "./UserNotFound";
import styles from "./styles.module.css";

const title: React.CSSProperties = {
  fontSize: 44,
  fontFamily: "Mona Sans",
  margin: 0,
  padding: 0,
  fontWeight: 900,
  color: "white",
  lineHeight: 1.2,
  marginBottom: 10,
  background: "linear-gradient(270.02deg, #ddd 20.63%, #fff 99.87%)",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export const HomeBox: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  return (
    <GradientBox
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 30,
        position: "fixed",
        bottom: 220,
        overflow: "visible",
        width: "calc(100% - 50px)",
        maxWidth: 800,
      }}
    >
      <div className={`${styles.gradientText} ${styles.h2}`}>
        #GitHubUnwrapped 2023
      </div>
      <div style={title}>Your coding year in review</div>
      <div style={{ fontWeight: 500, fontSize: 16 }}>
        Get a personalized video of your GitHub activity in 2023.
        <br />
        Type your username to get started!
      </div>
      <div className={styles.inputWrapper}>
        {userNotFound && <UserNotFound />}
        <LoginOptions
          userNotFound={userNotFound}
          setUserNotFound={setUserNotFound}
          username={username}
          setUsername={setUsername}
        />
      </div>
      <Octocat userNotFound={userNotFound} />
    </GradientBox>
  );
};
