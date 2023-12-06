import { useState } from "react";
import { HomeForeground } from "./Home/HomeForeground";
import { Navbar } from "./Home/Navbar";
import { Planet } from "./Home/Planet";
// import { HomeForeground } from "./Home/HomeForeground";
// import { Navbar } from "./Home/Navbar";
// import { Planet } from "./Home/Planet";
import { Stars } from "./Home/Stars";
import { HomeBox } from "./HomeBox/HomeBox";
import { Octocat } from "./Octocat";
// import { HomeBox } from "./HomeBox/HomeBox";
import { HomeBackground } from "./Home/HomeBackground";
import { RadialGradient } from "./RadialGradient";
import styles from "./styles.module.css";

const Home = () => {
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className={styles.container}>
        <RadialGradient />
        <Stars />
        <div>
          <img
            style={{
              width: 144,
            }}
            src="/walking-octocat.gif"
            alt="loading"
          />
          <p style={{ width: 144, textAlign: "center" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <RadialGradient />
      <Stars />
      <HomeBackground />
      <Planet />
      <HomeForeground />
      <Navbar />
      <HomeBox
        userNotFound={userNotFound}
        setUserNotFound={setUserNotFound}
        setLoading={setLoading}
      />
      <Octocat userNotFound={userNotFound} />
    </div>
  );
};

export default Home;
