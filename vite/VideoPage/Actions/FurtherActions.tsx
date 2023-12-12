import { Link } from "@tanstack/react-router";
import { PrivateContributionsIcon } from "../../../icons/PrivateContributionsIcon";
import { UserIcon } from "../../../icons/UserIcon";
import { signInWithGitHubLink } from "../../sign-in-with-github";
import { FurtherAction } from "./FurtherAction";
import styles from "./styles.module.css";

export const FurtherActions: React.FC = () => {
  if (window.__USER__ === "not-found") {
    return;
  }

  return (
    <div className={styles.furtherActionsWrapper}>
      <div className={styles.furtherActionsTitle}>Still curious?</div>
      <div className={styles.furtherActionsButtonContainer}>
        <Link to="/">
          <FurtherAction
            icon={(params) => <UserIcon {...params} />}
            label="Unwrap another user"
          />
        </Link>
        {window.__USER__!.loggedInWithGitHub ? null : (
          <a href={signInWithGitHubLink()}>
            <FurtherAction
              icon={(params) => (
                <PrivateContributionsIcon {...params} width={20} />
              )}
              label="Unlock private metrics"
            />
          </a>
        )}
      </div>
    </div>
  );
};
