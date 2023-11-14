import { Background } from "./Background";
import { Description } from "./Description";
import { Planets } from "./Planets";
import { Rocket } from "./Rocket";

export const TopLanguages: React.FC<{}> = () => {
  return (
    <Background>
      <Description />
      <Rocket />
      <Planets />
    </Background>
  );
};
