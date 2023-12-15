import { signInWithGitHubLink } from "../sign-in-with-github";
import styles from "../styles.module.css";
import { EmailForm } from "./EmailForm";

export type AboutItemContent = {
  id: string;
  icon: string;
  step?: number;
  title: string;
  description?: string;
  node?: React.ReactNode;
};

export const content: Array<AboutItemContent> = [
  {
    id: "private-activity",
    icon: "/eyeball.svg",
    title: "Private activity not showing up?",
    description: "",
    node: (
      <>
        <p>
          To enable private contributions, you need to enable {'"'}Private
          contributions{'"'} in your GitHub profile.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            margin: "32px 0 48px 0",
          }}
        >
          <div
            style={{
              width: 300,
              height: 172,
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 4px 16px 8px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src="/privateactivity.png"
              style={{
                objectFit: "cover",
                width: "100%",
              }}
            />
          </div>
        </div>
        <div>
          Furthermore, you may need to login with GitHub and authorize the
          organizations you want to include in your video.
        </div>
        <p>
          To reset your statistics if you logged in with GitHub, click the
          button below.
        </p>
        <a
          className={styles.aboutButton}
          style={{ lineHeight: "43px" }}
          href={signInWithGitHubLink(true)}
        >
          Login again
        </a>
        <p>
          If you just entered your username, visit
          githubunwrapped.com/YourUsername?reset=true to reset your statistics
          (can be done up to three times).
        </p>
      </>
    ),
  },
  {
    id: "permissions",
    icon: "/key.svg",
    title: "Why does GitHub Unwrapped need write permission?",
    description: "",
    node: (
      <>
        <p>There are two types of logins: GitHub apps and OAuth logins.</p>
        <p>
          We found that with GitHub apps, every organization admin needs to
          grant access in order for the data to be included in GitHub Unwrapped.
          <br />
          OAuth apps don&apos;t have this limitation, but are not fine-grained -
          we require the repository scope which also grants write access.
        </p>
        <p>
          Of course we don&apos;t write to the account, we also don&apos;t keep
          the access token after the stats have been fetched, abstaining
          ourselves from any future access to your account. The authentication
          code we deploy is available under{" "}
          <a
            className={styles.aboutLink}
            href="https://github.com/remotion-dev/github-unwrapped-2023"
          >
            here
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "how-it-works",
    icon: "/book.svg",
    title: "How it works",
    description: `We call GitHub's GraphQL API to fetch and calculate your statistics. The data cutoff is approximately 24 hours before you generated the video. The video gets created using Remotion.`,
  },
  {
    id: "how-are-top-languages-calculated",
    icon: "/calculator.svg",
    title: "How are my top languages calculated?",
    description: `Your top languages are not exactly calculated in a scientific way but are estimated according to the following formula:
      The list of repositories that you contributed to are fetched. A ranking is assigned to the top 3 languages (top language = 3 points, second = 2 points, third = 1 point) and they are multiplied by the contribution count and the amount of lines of that language in that repository.`,
  },
  {
    id: "open-source",
    icon: "/open-source.svg",
    title: "Is this project open-source?",
    description: ``,
    node: (
      <p>
        The{" "}
        <a
          className={styles.aboutLink}
          href="https://github.com/remotion-dev/github-unwrapped-2023"
        >
          source code
        </a>{" "}
        of the project is open-source.
        <br />
        <br />
        Remotion, the framework for making videos programmatically is required
        as a dependency and is source-available. It requires companies to obtain
        a{" "}
        <a
          className={styles.aboutLink}
          href="https://github.com/remotion-dev/remotion/blob/main/LICENSE.md"
        >
          license
        </a>{" "}
        to use it.
      </p>
    ),
  },
  {
    id: "make-your-own",
    icon: "/chat.svg",
    title: "Want to host a year in review for your users?",
    description: ``,
    node: (
      <>
        <p>
          Want to give your users their personalized video at the end of 2024?
          <br />
          <br />
          <strong>Developers</strong>: <br />
          Check out{" "}
          <a className={styles.aboutLink} href="https://www.remotion.dev">
            Remotion
          </a>{" "}
          and the source code of{" "}
          <a
            className={styles.aboutLink}
            href="https://github.com/remotion-dev/github-unwrapped-2023"
          >
            this project
          </a>
          !<br />
          <br /> <strong>Non-developers</strong>:
          <br />
          Drop your company email and we{"'"}ll contact you in September 2024
          for a free consultation!
        </p>
        <EmailForm />
      </>
    ),
  },
  {
    id: "who-is-behind",
    icon: "/detective.svg",
    title: "Who is behind GitHub Unwrapped?",
    description: "",
    node: (
      <p>
        The project was implemented by{" "}
        <a className={styles.aboutLink} href="https://www.remotion.dev">
          Remotion
        </a>{" "}
        in collaboration with{" "}
        <a className={styles.aboutLink} href="https://www.foronered.com">
          For One Red
        </a>
        {", "}
        who also designed the entirety of this project.
      </p>
    ),
  },
  {
    id: "credits",
    icon: "/trophy.svg",
    title: "Credits",
    node: (
      <p style={{ marginTop: 0 }}>
        Design -{" "}
        <a className={styles.aboutLink} href="https://www.foronered.com/">
          For One Red{" "}
        </a>{" "}
        <br />
        Music -{" "}
        <a className={styles.aboutLink} href="https://www.smartsound.com/">
          Smartsound{" "}
        </a>{" "}
        <br />
        Font -{" "}
        <a
          className={styles.aboutLink}
          href="https://github.com/github/mona-sans"
        >
          Mona Sans
        </a>{" "}
        by GitHub <br />
      </p>
    ),
  },
  {
    id: "contact",
    icon: "/mail.svg",
    title: "Contact",
    description: ``,
    node: (
      <a
        target="_blank"
        href="mailto:hi@remotion.dev"
        rel="noreferrer"
        className={styles.aboutButton}
        style={{ lineHeight: "43px" }}
      >
        hi@remotion.dev
      </a>
    ),
  },
];
