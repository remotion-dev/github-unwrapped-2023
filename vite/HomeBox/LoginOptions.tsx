import React, { useCallback, useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { SignInWithGitHub } from "../SignInWithGitHub";
import styles from "./styles.module.css";

type Props = {
  userNotFound: boolean;
  setUserNotFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const getRandomUsername = () => {
  const usernames = ["steven-tey", "awesomekling", "wcandillon", "mehmetademi"];
  return usernames[Math.floor(Math.random() * usernames.length)];
};

export const LoginOptions: React.FC<Props> = ({
  userNotFound,
  setUserNotFound,
}) => {
  const [username, setUsername] = useState<string>("");

  const placeholderUsername = getRandomUsername();

  const placeholderString =
    window.innerWidth > 640
      ? `Your GitHub Username (e.g. ${placeholderUsername})`
      : "Your GitHub Username";

  const handleClick: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "Not Found") {
            setUserNotFound(true);
          } else {
            setUserNotFound(false);
            window.location.href = `/loading/${username}`;
          }
        })
        .catch((error) => console.log("error", error));
    },
    [setUserNotFound, username],
  );

  return (
    <div className={styles.loginOptionsWrapper}>
      <form className={styles.buttonContainer} onSubmit={handleClick}>
        <Input
          text={username}
          placeHolder={placeholderString}
          setText={setUsername}
          invalid={userNotFound}
          className={styles.input}
        />
        <Button
          hoverEffect
          className={styles.desktopSubmitButton}
          type={"submit"}
        >
          Unwrap
        </Button>
      </form>
      <div className={styles.divider} />
      <div className={styles.privateContributions}>
        Want to include private activity?
        <SignInWithGitHub />
      </div>
    </div>
  );
};
