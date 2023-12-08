import { useSearch } from "@tanstack/react-router";
import { AboutItem } from "../About/AboutItem";
import { DesktopHeader } from "../About/DesktopHeader";
import { MobileHeader } from "../About/MobileHeader";
import styles from "../About/styles.module.css";
import { Stars } from "../Home/Stars";
import { RadialGradient } from "../RadialGradient";
import { shareRoute } from "../routing";
import { content } from "./content";

const headerProps = {
  description:
    "Follow these instructions to share your GitHub Unwrapped 2023 video.",
  title: "How to Share",
};

export const SharePage = () => {
  const { platform } = useSearch({ from: shareRoute.id });

  return (
    <div className={styles.wrapper}>
      <RadialGradient />
      <Stars />
      <div className={styles.contentWrapper}>
        <MobileHeader {...headerProps} />
        <DesktopHeader {...headerProps} />
        <div className={styles.content}>
          {content(platform).map((item) => (
            <AboutItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
