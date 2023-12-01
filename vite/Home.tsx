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

  return (
    <div className={styles.container}>
      <RadialGradient />
      <Stars />
      <HomeBackground />
      <Planet />
      <HomeForeground />
      <Navbar />
      <HomeBox userNotFound={userNotFound} setUserNotFound={setUserNotFound} />
      <Octocat userNotFound={false} />
    </div>
  );
};

export default Home;
