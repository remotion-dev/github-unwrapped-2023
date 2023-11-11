import { Background } from "./Background";
import { Planets } from "./Planets";
import { Rocket } from "./Rocket";

export const TopLanguages: React.FC<{}> = () => {
  return (
    <Background>
      <Rocket />
      <Planets />
    </Background>
  );
};
