import { AbsoluteFill } from "remotion";
import { ZoomedOutTopLanguages } from "..";

export const Intro: React.FC = (props) => {
  return (
    <AbsoluteFill>
      <ZoomedOutTopLanguages
        first={""}
        second={""}
        third={""}
        style={{ transform: "scale(1.4)", marginTop: 300, marginLeft: 300 }}
      />
    </AbsoluteFill>
  );
};
