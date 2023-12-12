import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { SignInWithGitHub } from "../SignInWithGitHub";
import styles from "./styles.module.css";

type Props = {
  userNotFound: boolean;
  setUserNotFound: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginOptions: React.FC<Props> = ({
  userNotFound,
  setUserNotFound,
}) => {
  const [username, setUsername] = useState<string>("");
  const [placeholderUsername, setPlaceholderUsername] = useState<string>("");

  // Function to select a random username
  const getRandomUsername = () => {
    const usernames = [
      "steven-tey",
      "awesomekling",
      "wcandillon",
      "jonnyburger",
      "mehmetademi",
    ];
    return usernames[Math.floor(Math.random() * usernames.length)];
  };

  // Set a random username as placeholder on component mount
  useEffect(() => {
    setPlaceholderUsername(getRandomUsername());
  }, []);

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
          placeHolder={`Your GitHub Username  (e.g. ${placeholderUsername})`}
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
