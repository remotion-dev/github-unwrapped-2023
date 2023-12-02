import styles from "./styles.module.css";

export const NavigateBack = () => {
  return (
    <a href="/" className={styles.navigateBack}>
      <img
        src="/arrow.svg"
        style={{ width: 32, height: 32, transform: "rotate(180deg)" }}
      />
    </a>
  );
};
