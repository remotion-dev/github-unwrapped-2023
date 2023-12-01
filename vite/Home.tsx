import { HomeForeground } from "./Home/HomeForeground";
import { Navbar } from "./Home/Navbar";
import { Planet } from "./Home/Planet";
// import { HomeForeground } from "./Home/HomeForeground";
// import { Navbar } from "./Home/Navbar";
// import { Planet } from "./Home/Planet";
import { Stars } from "./Home/Stars";
import { HomeBox } from "./HomeBox/HomeBox";
// import { HomeBox } from "./HomeBox/HomeBox";
import { RadialGradient } from "./RadialGradient";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <RadialGradient />
      <Stars />
      {/* <HomeBackground /> */}
      <Planet />
      <HomeForeground />
      <Navbar />
      <HomeBox />
    </div>
  );
};

export default Home;
