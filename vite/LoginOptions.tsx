import { useNavigate } from "@tanstack/react-router";
import React, { useCallback } from "react";
import { Button } from "./Button/Button";
import { Input } from "./Input/Input";
import { SignInWithGitHub } from "./SignInWithiGitHub";
import { $usernamePath } from "./routing";
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
  const navigate = useNavigate();

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
            navigate({ to: $usernamePath, params: { username } });
          }
        })
        .catch((error) => console.log("error", error));
    },
    [navigate, setUserNotFound, username]
  );

  return (
    <div className={styles.inputContainer}>
      <form className={styles.buttonContainer} onSubmit={handleClick}>
        <Input
          text={username}
          placeHolder="GitHub Username"
          setText={(s) => setUsername(s)}
          invalid={userNotFound}
          style={{
            fontWeight: "bold",
            padding: 15,
            fontFamily: "Mona Sans",
            height: 56,
            fontSize: 20,
            marginRight: 10,
          }}
        />
        <Button style={{ borderRadius: 5, height: 56 }}>Unwrap</Button>
      </form>
      <div style={{ width: 20, display: "inline-block" }} />
      <div style={{ fontSize: 16, fontWeight: 500 }}>
        Got private contributions?
        <div style={{ width: 10, display: "inline-block" }} />
        <SignInWithGitHub />
      </div>
    </div>
  );
};
