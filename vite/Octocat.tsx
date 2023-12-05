import styles from "./styles.module.css";

export const Octocat: React.FC<{ userNotFound: boolean }> = ({
  userNotFound,
}) => {
  return userNotFound ? (
    <img
      src="/octocat-error-state.svg"
      alt="Octocat (Sad)"
      className={styles.octocat}
    />
  ) : (
    <img
      src="/octocat-normal-state.svg"
      alt="Octocat"
      className={styles.octocat}
    />
  );
};
