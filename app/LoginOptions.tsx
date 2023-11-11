import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Button } from "../components/Button/Button";
import buttonStyles from "../components/Button/styles.module.css";
import { Input } from "../components/Input/Input";
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
  const router = useRouter();
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
            router.push(username);
          }
        })
        .catch((error) => console.log("error", error));
    },
    [router, setUserNotFound, username]
  );

  return (
    <div className={styles.inputContainer}>
      <form className={styles.buttonContainer} onSubmit={handleClick}>
        <Input
          text={username}
          placeHolder="Username"
          setText={(s) => setUsername(s)}
          invalid={userNotFound}
          style={{
            borderRadius: "5px 0 0 5px",
            width: 250,
            fontWeight: "bold",
          }}
          className={styles.input}
        />
        <Button
          className={styles.button}
          style={{ borderRadius: "0 5px 5px 0" }}
        >
          Start Unwrapped
        </Button>
      </form>

      <div>or</div>
      <Link
        style={{ textDecoration: "none" }}
        className={buttonStyles.secondarybutton}
        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`}
      >
        Sign in with GitHub
      </Link>
    </div>
  );
};
