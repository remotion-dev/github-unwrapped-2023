import { Stars } from "../Home/Stars";
import { RadialGradient } from "../RadialGradient";
import { default as commonStyles } from "../styles.module.css";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import { content } from "./content";
import styles from "./styles.module.css";

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
};

const About = () => {
  return (
    <div className={commonStyles.container}>
      <RadialGradient />
      <Stars />
      <div style={outerWrapper}>
        <div style={wrapper}>
          <MobileHeader />
          <DesktopHeader />
          <div className={styles.content}>
            {content.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className={commonStyles.aboutItem}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: -8,
                  }}
                >
                  <img src={item.icon} style={{ marginRight: 12 }} />
                  <h4
                    className={commonStyles.aboutItemTitle}
                    style={{ margin: 0 }}
                  >
                    {item.title}
                  </h4>
                </div>
                <p>{item.description}</p>
                {item.node}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
