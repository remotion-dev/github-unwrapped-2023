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
import styles from "./styles.module.css";
import { UserNotFound } from "./UserNotFound";

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
            fontFamily: "Mona Sans",
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
