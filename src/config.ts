import { zColor } from "@remotion/zod-types";
import { random } from "remotion/no-react";
import { z } from "zod";

export const SITE_NAME = "unwrapped2023";
export const RAM = 1200;
export const DISK = 2048;
export const TIMEOUT = 120;

const availablePlanets = ["Ice", "Silver", "Gold", "Leafy", "Fire"] as const;
export type Planet = (typeof availablePlanets)[number];

export const PlanetEnum = z.enum(availablePlanets);

export const LanguagesEnum = z.enum([
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "Rust",
  "C++",
  "Ruby",
  "PHP",
  "Nix",
  "C#",
]);

export const cornerTypeValues = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

export const cornerType = z.enum(cornerTypeValues);
export type Corner = z.infer<typeof cornerType>;

export const languageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("other"),
    name: z.string(),
    color: zColor(),
  }),
  z.object({
    type: z.literal("designed"),
    name: LanguagesEnum,
  }),
]);

export type TopLanguage = z.infer<typeof languageSchema>;

const days = ["0", "1", "2", "3", "4", "5", "6"] as const;
export const topWeekdaySchema = z.enum(days);

const hours = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
] as const;

export const topHourSchema = z.enum(hours);

export type Hour = (typeof hours)[number];

export type Weekday = (typeof days)[number];

export const productivityPerHourSchema = z.object({
  time: z.number(),
  productivity: z.number(),
});

export type ProductivityPerHour = z.infer<typeof productivityPerHourSchema>;

export const topLanguagesSchema = z.object({
  language1: languageSchema,
  language2: languageSchema.or(z.null()),
  language3: languageSchema.or(z.null()),
});

export const openingSceneStartAngle = z.enum(["left", "right"]);

export const accentColorValues = ["blue", "purple"] as const;
export const accentColorSchema = z.enum(accentColorValues);

export const rocketValues = ["blue", "orange", "yellow"] as const;
export const rocketSchema = z.enum(rocketValues);
export type Rocket = (typeof rocketValues)[number];

export type AccentColor = z.infer<typeof accentColorSchema>;

export const compositionSchema = z.object({
  topLanguages: topLanguagesSchema.or(z.null()),
  corner: cornerType,
  showHelperLine: z.boolean(),
  login: z.string(),
  planet: PlanetEnum,
  starsGiven: z.number(),
  issuesOpened: z.number(),
  issuesClosed: z.number(),
  totalPullRequests: z.number(),
  topWeekday: topWeekdaySchema,
  topHour: topHourSchema,
  graphData: z.array(productivityPerHourSchema),
  openingSceneStartAngle,
  accentColor: accentColorSchema,
  rocket: rocketSchema,
  contributionData: z.array(z.number()),
  totalContributions: z.number(),
  sampleStarredRepos: z.array(z.string()),
});

export const RenderRequest = z.object({
  username: z.string(),
  theme: rocketSchema,
});

export type RenderResponse =
  | {
      type: "video-available";
      url: string;
    }
  | {
      type: "render-running";
      renderId: string;
      progress: number;
    }
  | {
      type: "render-error";
      error: string;
    };

export const ProgressRequest = z.object({
  username: z.string(),
  theme: z.string(),
});

export const StatsRequest = z.object({
  username: z.string(),
});

export const generateRandomCorner = ({
  lowercasedUsername,
}: {
  lowercasedUsername: string;
}): Corner => {
  const randomSeed = random(lowercasedUsername);

  const index = Math.floor(randomSeed * cornerTypeValues.length);

  return cornerTypeValues[index];
};

export type ProfileStats = {
  totalPullRequests: number;
  username: string;
  lowercasedUsername: string;
  openIssues: number;
  closedIssues: number;
  fetchedAt: number;
  loggedInWithGitHub: boolean;
  totalStars: number;
  sampleStarredRepos: string[];
  totalContributions: number;
  topLanguages: Array<{ languageName: string; color: string }>;
  bestHours: Record<string, number>;
  topWeekday: Weekday;
  topHour: Hour;
  graphData: ProductivityPerHour[];
  contributionData: number[];
  allWeekdays: number[];
};

export type CompositionParameters = z.infer<typeof compositionSchema>;

const computePlanet = (userStats: ProfileStats): z.infer<typeof PlanetEnum> => {
  if (userStats.totalContributions >= 5000) {
    return PlanetEnum.Enum.Gold;
  }

  if (userStats.totalContributions > 4000) {
    return PlanetEnum.Enum.Silver;
  }

  if (userStats.totalContributions > 3000) {
    return PlanetEnum.Enum.Leafy;
  }

  if (userStats.totalContributions > 2000) {
    return PlanetEnum.Enum.Fire;
  }

  return PlanetEnum.Enum.Ice;
};

export const parseTopLanguage = (topLanguage: {
  languageName: string;
  color: string;
}): z.infer<typeof languageSchema> => {
  try {
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
  rocketPreference: Rocket | null,
): CompositionParameters => {
  const accentColor =
    accentColorValues[
      Math.floor(
        random(userStats.lowercasedUsername + "accent") *
          accentColorValues.length,
      )
    ];

  const defaultRocket =
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
            language1: parseTopLanguage(userStats.topLanguages[0]),
            language2:
              userStats.topLanguages.length > 1
                ? parseTopLanguage(userStats.topLanguages[1])
                : null,
            language3:
              userStats.topLanguages.length > 2
                ? parseTopLanguage(userStats.topLanguages[2])
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
    totalContributions: userStats.totalContributions,
    topHour: userStats.topHour,
    graphData: userStats.graphData,
    openingSceneStartAngle:
      random(userStats.lowercasedUsername + "startAngle") > 0.5
        ? "left"
        : "right",
    accentColor,
    rocket: rocketPreference ? rocketPreference : defaultRocket,
    contributionData: userStats.contributionData,
    sampleStarredRepos: userStats.sampleStarredRepos,
  };
};

export const ogImageSchema = z.object({
  issues: z.number(),
  stars: z.number(),
  contributionData: z.array(z.number()),
  pullRequests: z.number(),
  weekdays: z.array(z.number()),
  login: z.string(),
  topLanguage: languageSchema.or(z.null()),
});
