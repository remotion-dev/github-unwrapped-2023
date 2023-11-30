import React, { useCallback } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { SignInWithGitHub } from "../SignInWithGitHub";
import styles from "./styles.module.css";

type Props = {
  userNotFound: boolean;
  setUserNotFound: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export const LoginOptions: React.FC<Props> = ({
  username,
  setUsername,
  userNotFound,
  setUserNotFound,
}) => {
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
            window.location.href = `/${username}`;
          }
        })
        .catch((error) => console.log("error", error));
    },
    [setUserNotFound, username],
  );

  return (
    <div>
      <form className={styles.buttonContainer} onSubmit={handleClick}>
        <Input
          text={username}
          placeHolder="GitHub Username"
          setText={(s) => setUsername(s)}
          invalid={userNotFound}
          className={styles.input}
        />
        <Button className={styles.desktopSubmitButton} type={"submit"}>
          Unwrap
        </Button>
        {/* <Button
          className={styles.mobileSubmitButton}
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          type={"submit"}
        >
          <ChevronRight />
        </Button> */}
      </form>
      <div style={{ width: 20, display: "inline-block" }} />
      <div style={{ fontSize: 16, fontWeight: 500 }}>
        Want to include private contributions?
        <div style={{ width: 10, display: "inline-block" }} />
        <SignInWithGitHub />
      </div>
    </div>
  );
};
