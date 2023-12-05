import { getOctocatLine } from "../../../remotion/TopLanguages/octocat-line";
import { OctocatBody } from "./Octocat-body";
import { OctocatLine } from "./octocat-line";
import styles from "./styles.module.css";

export const OctoCat: React.FC = () => {
  return (
    <svg className={styles.desktopOctocat} viewBox="0 0 1442 997" fill="none">
      <OctocatLine mode="imperative" />
      <OctocatBody
        d={getOctocatLine({
          noise1: 0,
          noise2: 0,
          noise3: 0,
          noise4: 0,
          noise5: 0,
          endOffsetX: 0,
          endOffsetY: 0,
        })}
        endOffsetX={0}
        endOffsetY={0}
        rotation={0}
        progress={1}
      />
    </svg>
  );
};
