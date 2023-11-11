import styles from "./styles.module.css";

export const Octocat: React.FC<{ userNotFound: boolean }> = ({
  userNotFound,
}) => {
  return userNotFound ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/sad-octocat.svg" alt="Octocat" className={styles.octocat} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/octocat.svg" alt="Octocat" className={styles.octocat} />
  );
};
