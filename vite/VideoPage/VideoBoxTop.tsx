import { RocketIcon } from "../../icons/RocketIcon";
import boxStyles from "../HomeBox/styles.module.css";
import { HomeLink } from "../HomeLink";
import gradientStyles from "../styles.module.css";

export const VideoBoxTop = () => {
  return (
    <div className={boxStyles.headerTopContainer}>
      <h2
        className={gradientStyles.gradientText2}
        style={{ fontSize: 18, marginLeft: 7 }}
      >
        #GitHubUnwrapped
      </h2>
      <div className={boxStyles.linkContainer}>
        <HomeLink
          href="https://example.com"
          label="About Unwrapped"
          icon={(props) => <RocketIcon {...props} />}
        />
      </div>
    </div>
  );
};
