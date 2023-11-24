import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Sequence } from "remotion";
import { z } from "zod";
import { PlanetScaleWiggle } from "./PlaneScaleWiggle";
import { PlanetScaleOut } from "./PlanetScaleOut";
import { PlanetScaleSpiral } from "./PlanetScaleSpiral";
import { TopLanguagesTitleCard } from "./TitleCard";
import type { LanguageType } from "./constants";
import { LanguagesEnum } from "./constants";
import { cornerType } from "./corner";

export const allPlanetsSchema = z.object({
  language1: LanguagesEnum,
  language2: LanguagesEnum.or(z.null()),
  language3: LanguagesEnum.or(z.null()),
  corner: cornerType,
  showHelperLine: z.boolean(),
  login: z.string(),
});

export const allPlanetsTransitionTiming = springTiming({
  config: {
    damping: 200,
  },
  durationInFrames: 15,
});

const TITLE_CARD_DURATION = 100;
const FIRST_PLACE_DURATION = 120;
const SECOND_PLACE_DURATION = 120;
const THIRD_PLACE_DURATION = 110;

export const getDurationOfAllPlanets = ({
  language2,
  language3,
  fps,
}: {
  language2: LanguageType | null;
  language3: LanguageType | null;
  fps: number;
}) => {
  const transitionDuration = allPlanetsTransitionTiming.getDurationInFrames({
    fps,
  });

  const transitionBetween1And2 = language2 ? -transitionDuration : 0;
  const transitionBetween2And3 = language3 ? -transitionDuration : 0;

  const thirdDuration = language3 ? THIRD_PLACE_DURATION : 0;
  const secondDuration = language2 ? SECOND_PLACE_DURATION : 0;

  return (
    TITLE_CARD_DURATION +
    thirdDuration +
    secondDuration +
    FIRST_PLACE_DURATION +
    transitionBetween1And2 +
    transitionBetween2And3 -
    transitionDuration
  );
};

export const AllPlanets: React.FC<z.infer<typeof allPlanetsSchema>> = ({
  language1,
  language2,
  language3,
  corner,
  showHelperLine,
  login,
}) => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={TITLE_CARD_DURATION}>
        <Sequence
          style={{
            overflow: "hidden",
          }}
        >
          <TopLanguagesTitleCard login={login} />
        </Sequence>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-top" })}
        timing={allPlanetsTransitionTiming}
      />
      {language3 ? (
        <>
          <TransitionSeries.Sequence
            key="language3"
            durationInFrames={THIRD_PLACE_DURATION}
          >
            <PlanetScaleOut position={3} corner={corner} language={language3} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            key="scene3"
            presentation={slide({ direction: "from-bottom" })}
            timing={allPlanetsTransitionTiming}
          />
        </>
      ) : null}
      {language2 ? (
        <>
          <TransitionSeries.Sequence
            key="transition2"
            style={{
              overflow: "hidden",
            }}
            durationInFrames={SECOND_PLACE_DURATION}
          >
            <PlanetScaleSpiral
              showHelperLine={showHelperLine}
              language={language2}
              corner={corner}
              position={2}
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            key="scene2"
            presentation={slide({ direction: "from-top" })}
            timing={allPlanetsTransitionTiming}
          />
        </>
      ) : null}
      <TransitionSeries.Sequence
        durationInFrames={FIRST_PLACE_DURATION}
        style={{
          overflow: "hidden",
        }}
      >
        <PlanetScaleWiggle position={1} language={language1} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
