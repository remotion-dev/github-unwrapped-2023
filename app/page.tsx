"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { GradientBox } from "../components/GradientBox/GradientBox";
import { HomeBackground } from "../components/HomeBackground";
import { HomeForeground } from "../components/HomeForeground";
import { RadialGradient } from "../components/RadialGradient";
import { Stars } from "../components/Stars";
import { Header } from "./Header";
import { LoginOptions } from "./LoginOptions";
import { Octocat } from "./Octocat";
import styles from "./styles.module.css";
import { UserNotFound } from "./UserNotFound";

const Home: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <RadialGradient></RadialGradient>
      <Stars></Stars>
      <HomeBackground></HomeBackground>
      <HomeForeground></HomeForeground>
      <Header />
      <GradientBox
        style={{
          flex: "0 0 360px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={`${styles.gradientText} ${styles.h2}`}>
          #GitHubUnwrapped 2023
        </div>
        <div
          style={{
            fontSize: 32,
          }}
          className={styles.title}
        >
          Unlock your coding year in review
        </div>
        <div style={{ fontWeight: 400, fontSize: 20 }}>
          Get a personalized video of your GitHub activity in 2023.
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
    </div>
  );
};

export default Home;
