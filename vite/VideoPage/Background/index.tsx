import { AbsoluteFill } from "remotion";
import { Back } from "./Back";
import { Earth } from "./Earth";
import { OctoCat } from "./Octocat";
import { Octocat2 } from "./Octocat2";
import styles from "./styles.module.css";

export const VideoPageBackground = () => {
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "radial-gradient(121.11% 121.11% at 47.08% 0%, #0F102E 0%, #000 100%)",
      }}
    >
      <OctoCat />
      <Octocat2 className={styles.mobileOctocat} />
      <Back className={styles.clouds} />
      <Earth className={styles.earth} />
    </AbsoluteFill>
  );
};
