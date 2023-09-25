// 1. Paste keyframes from After Effects
// 2. `bun print-keyframes.ts`
// 3. Correct easing (here everything is linear)

import { convertAfterEffectsKeyFrames } from "./remotion/helpers/convert-after-effects-keyframes";

const keyframes = `
Adobe After Effects 8.0 Keyframe Data

	Units Per Second	29.97
	Source Width	8192
	Source Height	7701
	Source Pixel Aspect Ratio	1
	Comp Pixel Aspect Ratio	1

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


End of Keyframe Data

`.trim();

const converted = convertAfterEffectsKeyFrames(keyframes);

for (const keyframe of converted.keyframes) {
  console.log(keyframe.transform);
  console.log(keyframe.keyframeArray);
}
