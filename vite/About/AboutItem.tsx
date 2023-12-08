import type { AboutItemContent } from "./content";
import styles from "./styles.module.css";

export const AboutItem: React.FC<{ item: AboutItemContent }> = ({ item }) => {
  return (
    <div className={styles.aboutItem}>
      <div className={styles.aboutItemTitleRow}>
        {item.icon && <img src={item.icon} />}
        {item.step && <h4 className={styles.aboutItemTitle}>{item.step}.</h4>}
        <h4 className={styles.aboutItemTitle}>{item.title}</h4>
      </div>
      {item.description && <p>{item.description}</p>}
      {item.node}
    </div>
  );
};
