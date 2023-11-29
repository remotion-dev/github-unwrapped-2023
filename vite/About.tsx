import { Stars } from "./Home/Stars";
import { RadialGradient } from "./RadialGradient";
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
      icon: "/book.svg",
      title: "How it works",
      description: `We call GitHub's GraphQL API to fetch and calculate your statistics.The data cutoff is approximately 24 hours before you generated the video.The video gets created using Remotion.`,
    },
    {
      icon: "/book.svg",
      title: "How it works",
      description: `We call GitHub's GraphQL API to fetch and calculate your statistics.The data cutoff is approximately 24 hours before you generated the video.The video gets created using Remotion.`,
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
              <h2
                className={styles.gradientText2}
                style={{ fontSize: 24, marginTop: 0 }}
              >
                #GitHubUnwrapped
              </h2>
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
              <img />
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
              <div className={styles.aboutItem}>
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
