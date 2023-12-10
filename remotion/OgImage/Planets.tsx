import type { TopLanguage } from "../../src/config";
import { LanguagePlanet } from "../TopLanguages/Language";
import { computePlanetInfo } from "../TopLanguages/constants";

export const Planets: React.FC<{
  topLanguage: TopLanguage;
}> = ({ topLanguage }) => {
  const planetInfo = computePlanetInfo(topLanguage);

  return (
    <div
      style={{
        position: "absolute",
        top: 158,
        left: 1090,
        width: 360,
        height: 175,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 20,
        flexDirection: "row",
        gap: 25,
      }}
    >
      <LanguagePlanet
        planetInfo={planetInfo}
        style={{
          height: 80,
        }}
      />
    </div>
  );
};
