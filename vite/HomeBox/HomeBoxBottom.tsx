import { UserNotFound } from "../UserNotFound";
import { LoginOptions } from "./LoginOptions";
import styles from "./styles.module.css";

export const HomeBoxBottom: React.FC<{
  userNotFound: boolean;
  setUserNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setUserNotFound, userNotFound }) => {
  return (
    <div className={styles.homeBoxBottomWrapper}>
      <div className={styles.title}>Your coding year in review</div>
      <div className={styles.description}>
        Get a personalized video of your GitHub activity in 2023.
        <br />
        Type your username to get started!
      </div>
      <div className={styles.inputWrapper}>
        {userNotFound && <UserNotFound />}
        <LoginOptions
          userNotFound={userNotFound}
          setUserNotFound={setUserNotFound}
        />
      </div>
    </div>
  );
};
