import { expect, test } from "vitest";
import { convertAfterEffectsKeyFrames } from "../helpers/convert-after-effects-keyframes";

const sample = `
Adobe After Effects 8.0 Keyframe Data

	Units Per Second	29.97
	Source Width	8192
	Source Height	7701
	Source Pixel Aspect Ratio	1
	Comp Pixel Aspect Ratio	1

Transform	Scale
	Frame	X percent	Y percent	Z percent	
		14.2103	14.2103	103.928	

Transform	Position
	Frame	X pixels	Y pixels	Z pixels	
	0	540	540	0	
	91	460	500	0	
	95	460	500	0	
	180	560	520	0	
	186	560	520	0	
	272	540	540	0	
	281	540	540	0	
	375	610	540	0	

Transform	Opacity
	Frame	percent	
		100	

Transform	Rotation
	Frame	degrees	
	0	0	
	91	20	
	95	20	
	180	-22	
	186	-22	
	272	0	
	281	0	
	375	0	

Transform	Anchor Point
	Frame	X pixels	Y pixels	Z pixels	
		4096	3850.5	0	


End of Keyframe Data

`.trim();

test("Keyframe data", () => {
  expect(convertAfterEffectsKeyFrames(sample)).toEqual({
    fps: 29.97,
    sourceHeight: 7701,
    sourceWidth: 8192,
    keyframes: [
      {
        transform: "Scale",
        keyframeArray: [
          {
            time: 0,
            value: [14.2103, 14.2103, 103.928],
            easing: "linear",
          },
        ],
      },
      {
        transform: "Position",
        keyframeArray: [
          {
            time: 0,
            value: [540, 540, 0],
            easing: "linear",
          },
          {
            time: 91,
            value: [460, 500, 0],
            easing: "linear",
          },
          {
            time: 95,
            value: [460, 500, 0],
            easing: "linear",
          },
          {
            time: 180,
            value: [560, 520, 0],
            easing: "linear",
          },
          {
            time: 186,
            value: [560, 520, 0],
            easing: "linear",
          },
          {
            time: 272,
            value: [540, 540, 0],
            easing: "linear",
          },
          {
            time: 281,
            value: [540, 540, 0],
            easing: "linear",
          },
          {
            time: 375,
            value: [610, 540, 0],
            easing: "linear",
          },
        ],
      },
      {
        transform: "Opacity",
        keyframeArray: [
          {
            time: 0,
            value: 100,
            easing: "linear",
          },
        ],
      },
      {
        transform: "Rotation",
        keyframeArray: [
          {
            time: 0,
            value: 0,
            easing: "linear",
          },
          {
            time: 91,
            value: 20,
            easing: "linear",
          },
          {
            time: 95,
            value: 20,
            easing: "linear",
          },
          {
            time: 180,
            value: -22,
            easing: "linear",
          },
          {
            time: 186,
            value: -22,
            easing: "linear",
          },
          {
            time: 272,
            value: 0,
            easing: "linear",
          },
          {
            time: 281,
            value: 0,
            easing: "linear",
          },
          {
            time: 375,
            value: 0,
            easing: "linear",
          },
        ],
      },
      {
        transform: "Anchor Point",
        keyframeArray: [
          {
            time: 0,
            value: [4096, 3850.5, 0],
            easing: "linear",
          },
        ],
      },
    ],
  });
});
