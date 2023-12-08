import React, { useCallback, useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { SignInWithGitHub } from "../SignInWithGitHub";
import styles from "./styles.module.css";

type Props = {
  userNotFound: boolean;
  setUserNotFound: React.Dispatch<React.SetStateAction<boolean>>;

  setLoading: (v: boolean) => void;
};

export const LoginOptions: React.FC<Props> = ({
  userNotFound,
  setUserNotFound,
  setLoading,
}) => {
  const [username, setUsername] = useState<string>("");

  const handleClick: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      setLoading(true);
      e.preventDefault();
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "Not Found") {
            setUserNotFound(true);
            setLoading(false);
          } else {
            setUserNotFound(false);
            window.location.href = `/${username}`;
          }
        })
        .catch((error) => console.log("error", error));
    },
    [setLoading, setUserNotFound, username],
  );

  return (
    <div className={styles.loginOptionsWrapper}>
      <form className={styles.buttonContainer} onSubmit={handleClick}>
        <Input
          text={username}
          placeHolder="Your GitHub Username (e.g. ashtom)"
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
