import React, { useMemo } from "react";
import type { z } from "zod";
import { generateRandomCorner } from "../../remotion/TopLanguages/corner";
import {
  LanguagesEnum,
  PlanetEnum,
  type compositionSchema,
  type languageSchema,
} from "../../src/config";
import type { ProfileStats } from "../../src/server/db";
import { VideoPageBackground } from "./Background";
import { VideoBox } from "./VideoBox";
import styles from "./styles.module.css";

const outer: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: 0,
  backgroundColor: "#000",
};

const background: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "absolute",
};

const container: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  alignItems: "center",
  overflow: "auto",
};

declare global {
  interface Window {
    __USER__: ProfileStats;
  }
}

type CompositionParameters = z.infer<typeof compositionSchema>;

const computePlanet = (userStats: ProfileStats): z.infer<typeof PlanetEnum> => {
  if (userStats.totalContributions > 10000) {
    return PlanetEnum.Enum.Gold;
  }

  if (userStats.totalContributions > 1000) {
    return PlanetEnum.Enum.Silver;
  }

  return PlanetEnum.Enum.Ice;
};

const parseTopLanguage = (topLanguage: {
  name: string;
  color: string;
}): z.infer<typeof languageSchema> => {
  try {
    return LanguagesEnum.parse(topLanguage.name);
  } catch (e) {
    return topLanguage;
  }
};

const computeCompositionParameters = (
  userStats: ProfileStats,
): CompositionParameters => {
  return {
    login: userStats.username,
    corner: generateRandomCorner({
      lowercasedUsername: userStats.lowercasedUsername,
    }),
    language1: parseTopLanguage(userStats.topLanguages[0]),
    language2:
      userStats.topLanguages.length > 1
        ? parseTopLanguage(userStats.topLanguages[1])
        : null,
    language3:
      userStats.topLanguages.length > 2
        ? parseTopLanguage(userStats.topLanguages[2])
        : null,
    showHelperLine: false,
    planet: computePlanet(userStats),
    starsGiven: userStats.totalStars,
    issuesClosed: userStats.closedIssues,
    issuesOpened: userStats.openIssues,
    totalPullRequests: userStats.totalPullRequests,
  };
};

export const UserPage = () => {
  const inputProps: CompositionParameters = useMemo(() => {
    return computeCompositionParameters(window.__USER__);
  }, []);

  return (
    <div style={outer}>
      <div style={background} id="videobackground">
        <VideoPageBackground />
      </div>
      <div style={container} className={styles.videobox}>
        <VideoBox inputProps={inputProps} />
      </div>
    </div>
  );
};
