import { random } from "remotion";
import type { z } from "zod";
import { generateRandomCorner } from "../../remotion/TopLanguages/corner";
import type { compositionSchema } from "../../src/config";
import {
  LanguagesEnum,
  PlanetEnum,
  accentColorValues,
  rocketValues,
  type languageSchema,
} from "../../src/config";
import type { ProfileStats } from "../../src/server/db";

export type CompositionParameters = z.infer<typeof compositionSchema>;

const computePlanet = (userStats: ProfileStats): z.infer<typeof PlanetEnum> => {
  if (userStats.totalContributions >= 5000) {
    return PlanetEnum.Enum.Gold;
  }

  if (userStats.totalContributions > 1000) {
    return PlanetEnum.Enum.Silver;
  }

  return PlanetEnum.Enum.Ice;
};

const parseTopLanguage = (
  topLanguage: {
    languageName: string;
    color: string;
  },
  rustRandomizer: number,
): z.infer<typeof languageSchema> => {
  try {
    if (topLanguage.languageName === "Rust") {
      if (rustRandomizer < 0.33) {
        return {
          type: "designed",
          name: LanguagesEnum.Enum.Rust1,
        };
      }

      if (rustRandomizer < 0.66) {
        return {
          type: "designed",
          name: LanguagesEnum.Enum.Rust2,
        };
      }

      return {
        type: "designed",
        name: LanguagesEnum.Enum.Rust3,
      };
    }

    const lang = LanguagesEnum.parse(topLanguage.languageName);
    return {
      type: "designed",
      name: lang,
    };
  } catch (e) {
    return {
      type: "other",
      color: topLanguage.color,
      name: topLanguage.languageName,
    };
  }
};

export const computeCompositionParameters = (
  userStats: ProfileStats,
): CompositionParameters => {
  const rustRandomizer = random(userStats.lowercasedUsername + "rust");

  const accentColor =
    accentColorValues[
      Math.floor(
        random(userStats.lowercasedUsername + "accent") *
          accentColorValues.length,
      )
    ];

  const rocket =
    rocketValues[
      Math.floor(
        random(userStats.lowercasedUsername + "rocket") * rocketValues.length,
      )
    ];
  return {
    login: userStats.username,
    corner: generateRandomCorner({
      lowercasedUsername: userStats.lowercasedUsername,
    }),
    topLanguages:
      userStats.topLanguages.length > 0
        ? {
            language1: parseTopLanguage(
              userStats.topLanguages[0],
              rustRandomizer,
            ),
            language2:
              userStats.topLanguages.length > 1
                ? parseTopLanguage(userStats.topLanguages[1], rustRandomizer)
                : null,
            language3:
              userStats.topLanguages.length > 2
                ? parseTopLanguage(userStats.topLanguages[2], rustRandomizer)
                : null,
          }
        : null,
    showHelperLine: false,
    planet: computePlanet(userStats),
    starsGiven: userStats.totalStars,
    issuesClosed: userStats.closedIssues,
    issuesOpened: userStats.openIssues,
    totalPullRequests: userStats.totalPullRequests,
    topWeekday: userStats.topWeekday,
    topHour: userStats.topHour,
    graphData: userStats.graphData,
    openingSceneStartAngle:
      random(userStats.lowercasedUsername + "startAngle") > 0.5
        ? "left"
        : "right",
    accentColor,
    rocket,
    contributionData: userStats.contributionData,
    sampleStarredRepos: userStats.sampleStarredRepos,
  };
};
