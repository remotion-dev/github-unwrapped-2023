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
        flexDirection: "column",
      }}
    >
      <LanguagePlanet
        planetInfo={planetInfo}
        style={{
          height: 100,
          marginBottom: 10,
        }}
      />
      <div
        style={{
          color: "white",
          fontFamily: "Mona Sans",
          fontSize: 18,
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        Top Language
      </div>
      <div
        style={{
          fontFamily: "Mona Sans",
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        {planetInfo.name}
      </div>
    </div>
  );
};
