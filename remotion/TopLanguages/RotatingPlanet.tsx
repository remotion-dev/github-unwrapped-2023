import React, { useMemo } from "react";
import { Series, random } from "remotion";
import { mapLanguageToPlanet } from "./constants";

const TypeScriptPlanet = mapLanguageToPlanet.TypeScript.PlanetSVG;
const RustPlanet = mapLanguageToPlanet.Rust2.PlanetSVG;
const CPlusPlusPlanet = mapLanguageToPlanet["C++"].PlanetSVG;
const GoPlanet = mapLanguageToPlanet.Go.PlanetSVG;
const PythonPlanet = mapLanguageToPlanet.Python.PlanetSVG;
const RubyPlanet = mapLanguageToPlanet.Ruby.PlanetSVG;

const planets = [
  TypeScriptPlanet,
  RustPlanet,
  CPlusPlusPlanet,
  GoPlanet,
  PythonPlanet,
  RubyPlanet,
];

const planetStyle: React.CSSProperties = {
  width: 110,
  height: 110,
};

export const RotatingPlanet: React.FC<{
  randomSeed: string;
}> = ({ randomSeed }) => {
  const sortedRandomly = useMemo(() => {
    return planets.slice().sort((a) => {
      return 0.5 - random(randomSeed + "seed" + planets.indexOf(a));
    });
  }, [randomSeed]);

  return (
    <div>
      <Series>
        {sortedRandomly.map((Planet, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Series.Sequence key={i} durationInFrames={16} layout="none">
            <Planet customColor={null} style={planetStyle} />
          </Series.Sequence>
        ))}
      </Series>
    </div>
  );
};
