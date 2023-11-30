import { RocketIcon } from "../../icons/RocketIcon";
import { HomeLink } from "../HomeLink";
import styles from "./styles.module.css";

export const VideoBoxTop = () => {
  return (
    <div className={styles.videoBoxTop}>
      {/**
      // TODO: Make this
       */}
      <HomeLink
        href="https://example.com"
        label="How we made Unwrapped"
        icon={(props) => <RocketIcon {...props} />}
      />
    </div>
  );
};
