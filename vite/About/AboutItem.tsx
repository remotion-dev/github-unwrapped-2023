import type { AboutItemContent } from "./content";
import styles from "./styles.module.css";

export const AboutItem: React.FC<{ item: AboutItemContent }> = ({ item }) => {
  return (
    <div className={styles.aboutItem}>
      <div className={styles.aboutItemTitleRow}>
        <img src={item.icon} />
        <h4 className={styles.aboutItemTitle}>{item.title}</h4>
      </div>
      <p>{item.description}</p>
      {item.node}
    </div>
  );
};
