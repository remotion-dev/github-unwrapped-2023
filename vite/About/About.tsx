import { Stars } from "../Home/Stars";
import { RadialGradient } from "../RadialGradient";
import gradientStyles from "../styles.module.css";
import styles from "./styles.module.css";

const header: React.CSSProperties = {
  display: "flex",
  height: 200,
};

const outerWrapper: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  overflowY: "auto",
  position: "absolute",
  zIndex: 100,
  top: 0,
  left: 0,
};

const wrapper: React.CSSProperties = {
  width: "100%",
  maxWidth: 700,
  margin: "0 auto",
  padding: "128px 0",
};

const About = () => {
  const content = [
    {
      icon: "/book.svg",
      title: "How it works",
      description: `We call GitHub's GraphQL API to fetch and calculate your statistics.The data cutoff is approximately 24 hours before you generated the video.The video gets created using Remotion.`,
    },
    {
      icon: "/open-source.svg",
      title: "Is this project open source?",
      description: `We call GitHub's GraphQL API to fetch and calculate your statistics.The data cutoff is approximately 24 hours before you generated the video.The video gets created using Remotion.`,
    },
    {
      icon: "/detective.svg",
      title: "Who is behind GitHub Unwrapped?",
      description: `This project was implemented by Remotion with support from GitHub.`,
    },
    {
      icon: "/calculator.svg",
      title: "How are my top languages calculated?",
      description: `Your top languages are not exactly calculated in a scientific way but are estimated according to the following formula:
      The list of repositories that you contributed to are fetched. A ranking is assigned to the top 3 languages (top language = 3 points, second = 2 points, third = 1 point) and they are multiplied by the contribution count and the amount of lines of that language in that repository.`,
    },
    {
      icon: "/chat.svg",
      title: "Want to host a year in review for your users?",
      description: `Want to give your users their personalized video at the end of 2023?
      Developers: Check out Remotion and the source code of this project!
      Non-developers: Drop your email and we'll contact you in September 2023 for a free consultation!`,
    },
    {
      icon: "/trophy.svg",
      title: "Credits",
      description: `Music (Candy Dream): Winter Holiday by Alec Koff
      Music (Funky Gold): Electro Swinging Charleston by CueTracks
      Music (Icy Winter): Christmas Chill by Roo Walker
      Programming language icons: Tal Revivo (Icon 54)
      Christmas icons: mehwishumar (Fiverr)
      Font: Mona Sans by GitHub
      Libraries used: Next.JS, Rough.JS`,
    },
    {
      icon: "/mail.svg",
      title: "Contact",
      description: ``,
    },
  ];

  return (
    <div className={styles.container}>
      <RadialGradient />
      <Stars />
      <div style={outerWrapper}>
        <div style={wrapper}>
          <div style={header}>
            <div
              style={{
                flex: 1,
              }}
            >
              <h2 className={gradientStyles.gradientText2}>#GitHubUnwrapped</h2>
              <h1
                className={styles.aboutTitle}
                style={{ margin: "16px 0 24px 0" }}
              >
                About
              </h1>
              <p className={styles.aboutDescription} style={{ maxWidth: 400 }}>
                With this page we hope to answer all your questions for the
                Github unwrapped 2023.
              </p>
            </div>
            <div
              style={{ flex: "0 0 200px", background: "rgba(255,255,255,0.1)" }}
            >
              <img
                src="/preview.png"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              paddingTop: 32,
              gap: 24,
              flexDirection: "column",
            }}
          >
            {content.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className={styles.aboutItem}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <img src={item.icon} style={{ marginRight: 12 }}></img>
                  <h4 className={styles.aboutItemTitle} style={{ margin: 0 }}>
                    {item.title}
                  </h4>
                </div>
                <p style={{ marginTop: 0 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
