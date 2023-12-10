import { LanguagePlanet } from "../TopLanguages/Language";
import { mapLanguageToPlanet } from "../TopLanguages/constants";

export const Planets: React.FC = () => {
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
      }}
    >
      <LanguagePlanet
        planetInfo={mapLanguageToPlanet.Java}
        style={{
          height: 100,
        }}
      />
      <LanguagePlanet
        planetInfo={mapLanguageToPlanet.PHP}
        style={{
          height: 100,
        }}
      />
      <LanguagePlanet
        planetInfo={mapLanguageToPlanet.Go}
        style={{
          height: 100,
        }}
      />
    </div>
  );
};
