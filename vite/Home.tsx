import { Header } from "./Header";
import { HomeBackground } from "./Home/HomeBackground";
import { HomeForeground } from "./Home/HomeForeground";
import { Planet } from "./Home/Planet";
import { Stars } from "./Home/Stars";
import { HomeBox } from "./HomeBox";
import { RadialGradient } from "./RadialGradient";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <RadialGradient />
      <Stars />
      <HomeBackground />
      <HomeForeground />
      <Planet />
      <Header />
      <HomeBox />
    </div>
  );
};

export default Home;
