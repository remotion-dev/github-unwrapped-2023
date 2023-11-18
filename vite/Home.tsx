import { useState } from "react";
import { GradientBox } from "./GradientBox/GradientBox";
import { Header } from "./Header";
import { HomeBackground } from "./Home/HomeBackground";
import { HomeForeground } from "./Home/HomeForeground";
import { Planet } from "./Home/Planet";
import { Stars } from "./Home/Stars";
import { LoginOptions } from "./LoginOptions";
import { Octocat } from "./Octocat";
import { RadialGradient } from "./RadialGradient";
import { UserNotFound } from "./UserNotFound";
import styles from "./styles.module.css";

const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <RadialGradient />
      <Stars />
      <HomeBackground />
      <HomeForeground />
      <Planet />
      <Header />
      <GradientBox
        style={{
          display: "flex",
          flexDirection: "column",
          paddingRight: 300,
          position: "fixed",
          bottom: 220,
        }}
      >
        <div className={`${styles.gradientText} ${styles.h2}`}>
          #GitHubUnwrapped 2023
        </div>
        <div
          style={{
            fontSize: 44,
            fontFamily: "Mona Sans",
          }}
          className={styles.title}
        >
          Your coding year in review
        </div>
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
    </div>
  );
};

export default Home;
