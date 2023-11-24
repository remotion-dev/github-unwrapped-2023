import { AbsoluteFill } from "remotion";
import { Back } from "./Back";
import { Earth } from "./Earth";
import { OctoCat } from "./Octocat";

export const VideoPageBackground = () => {
  return (
    <>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(121.11% 121.11% at 47.08% 0%, #0F102E 0%, #000 100%)",
        }}
      />
      <Back />
      <OctoCat />
      <Earth />
    </>
  );
};
