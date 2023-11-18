import { useState } from "react";
import { LoginOptions } from "./LoginOptions";
import { UserNotFound } from "./UserNotFound";
import styles from "./styles.module.css";

const title: React.CSSProperties = {
  fontSize: 44,
  fontFamily: "Mona Sans",
  margin: 0,
  padding: 0,
  fontWeight: 900,
  color: "white",
  lineHeight: 1.1,
  marginBottom: 10,
  background: "linear-gradient(270.02deg, #ddd 20.63%, #fff 99.87%)",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export const HomeBoxBottom: React.FC<{
  userNotFound: boolean;
  setUserNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setUserNotFound, userNotFound }) => {
  const [username, setUsername] = useState<string>("");

  return (
    <div style={{ padding: 30 }}>
      <div style={title}>Your coding year in review</div>
      <div style={{ fontWeight: 500, fontSize: 16 }}>
        Get a personalized video of your GitHub activity in 2023.
        <br />
        Type your username to get started!
      </div>
      <div className={styles.inputWrapper}>
        {userNotFound && <UserNotFound />}
        <LoginOptions
          userNotFound={userNotFound}
          setUserNotFound={setUserNotFound}
          username={username}
          setUsername={setUsername}
        />
      </div>
    </div>
  );
};
