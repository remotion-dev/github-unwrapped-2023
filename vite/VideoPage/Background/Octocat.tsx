import { OctocatBody } from "./Octocat-body";
import { OctocatLine } from "./octocat-line";

export const OctoCat: React.FC = () => {
  return (
    <svg
      style={{
        position: "fixed",
        width: "100%",
        bottom: 0,
        right: -100,
      }}
      viewBox="0 0 1442 997"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <OctocatBody />
      <OctocatLine />
      <defs>
        <linearGradient
          id="octocatgradient"
          x1="1118.7"
          y1="720.3"
          x2="1450.77"
          y2="720.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3772A8" />
          <stop offset="1" stopColor="#8FB0B3" />
        </linearGradient>
      </defs>
    </svg>
  );
};
