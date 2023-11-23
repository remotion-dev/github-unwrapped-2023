import styles from "./styles.module.css";

export const Octocat: React.FC<{ userNotFound: boolean }> = ({
  userNotFound,
}) => {
  return userNotFound ? (
    <img src="/sad-octocat.svg" alt="Octocat" className={styles.octocat} />
  ) : (
    <img src="/octocat.svg" alt="Octocat" className={styles.octocat} />
  );
};
