import { signInWithGitHubLink } from "../sign-in-with-github";
import styles from "../styles.module.css";
import { EmailForm } from "./EmailForm";

export type AboutItemContent = {
  icon?: string;
  step?: number;
  title: string;
  description?: string;
  node?: React.ReactNode;
};

export const content: Array<AboutItemContent> = [
  {
    icon: "/eyeball.svg",
    title: "Private contributions not showing up?",
    description: "",
    node: (
      <>
        <p>
          To enable private contributions, you need to enable {'"'}Private
          contributions{'"'} in your GitHub profile. Once you{"'"}ve done this,
          login in again and regenerate your video.
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

        <a
          className={styles.aboutButton}
          style={{ lineHeight: "43px" }}
          href={signInWithGitHubLink(true)}
        >
          Login again
        </a>
      </>
    ),
  },
  {
    icon: "/book.svg",
    title: "How it works",
    description: `We call GitHub's GraphQL API to fetch and calculate your statistics. The data cutoff is approximately 24 hours before you generated the video. The video gets created using Remotion.`,
  },
  {
    icon: "/calculator.svg",
    title: "How are my top languages calculated?",
    description: `Your top languages are not exactly calculated in a scientific way but are estimated according to the following formula:
      The list of repositories that you contributed to are fetched. A ranking is assigned to the top 3 languages (top language = 3 points, second = 2 points, third = 1 point) and they are multiplied by the contribution count and the amount of lines of that language in that repository.`,
  },
  {
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
          Drop your email and we{'"'}ll contact you in September 2024 for a free
          consultation!
        </p>
        <EmailForm />
      </>
    ),
  },
  {
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
