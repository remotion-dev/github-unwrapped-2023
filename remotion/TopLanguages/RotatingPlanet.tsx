import React, { useMemo } from "react";
import { Series, random } from "remotion";
import { LanguagePlanet } from "./Language";
import { mapLanguageToPlanet } from "./constants";

const TypeScriptPlanet = mapLanguageToPlanet.TypeScript;
const RustPlanet = mapLanguageToPlanet.Rust;
const CPlusPlusPlanet = mapLanguageToPlanet["C++"];
const GoPlanet = mapLanguageToPlanet.Go;
const PythonPlanet = mapLanguageToPlanet.Python;
const RubyPlanet = mapLanguageToPlanet.Ruby;

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
            <LanguagePlanet planetInfo={Planet} style={planetStyle} />
          </Series.Sequence>
        ))}
      </Series>
    </div>
  );
};
