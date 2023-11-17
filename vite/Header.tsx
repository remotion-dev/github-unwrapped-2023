import { GithubIcon } from "../icons/GithubIcon";
import { RemotionIcon } from "../icons/RemotionIcon";
import { RocketIcon } from "../icons/RocketIcon";
import { HomeLink } from "./HomeLink";
import styles from "./styles.module.css";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <HomeLink
        icon={(props) => <RemotionIcon {...props} />}
        label={"Made with Remotion"}
        href={"https://remotion.dev"}
      />
      <HomeLink
        href={"https://github.com/remotion-dev/github-unwrapped-2023"}
        label={"Source Code"}
        icon={(props) => <GithubIcon {...props} />}
      />
      <HomeLink
        href={"https://github.com/remotion-dev/github-unwrapped-2023"}
        label={"About Unwrapped"}
        icon={(props) => <RocketIcon {...props} />}
      />
    </div>
  );
};
