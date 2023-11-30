import { HomeBackground } from "./Home/HomeBackground";
import { HomeForeground } from "./Home/HomeForeground";
import { Planet } from "./Home/Planet";
import { Stars } from "./Home/Stars";
import { HomeBox } from "./HomeBox/HomeBox";
import { RadialGradient } from "./RadialGradient";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <RadialGradient />
      <Stars />
      <HomeBackground />
      <Planet />
      <HomeForeground className={styles.homeForeground} />
      <HomeBox />
    </div>
  );
};

export default Home;
