import { AbsoluteFill } from "remotion";

export const IssueGridLeft: React.FC = () => {
  return (
    <AbsoluteFill>
      <svg
        width="1080"
        height="1080"
        viewBox="0 0 1080 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_0_3" fill="white">
          <path d="M35 841H483V1041H55.9C44.3572 1041 35 1031.64 35 1020.1V841Z" />
        </mask>
        <path
          d="M35 841H483V1041H55.9C44.3572 1041 35 1031.64 35 1020.1V841Z"
          fill="url(#paint0_linear_0_3)"
        />
        <path
          d="M35 841H483H35ZM483 1042H55.9C43.805 1042 34 1032.2 34 1020.1H36C36 1031.09 44.9095 1040 55.9 1040H483V1042ZM55.9 1042C43.805 1042 34 1032.2 34 1020.1V841H36V1020.1C36 1031.09 44.9095 1040 55.9 1040V1042ZM483 841V1041V841Z"
          fill="url(#paint1_linear_0_3)"
          mask="url(#path-1-inside-1_0_3)"
        />
        <line
          x1="36"
          y1="976.5"
          x2="406"
          y2="976.5"
          stroke="url(#paint2_linear_0_3)"
          strokeOpacity="0.28"
        />

        <defs>
          <linearGradient
            id="paint0_linear_0_3"
            x1="44"
            y1="1041"
            x2="93"
            y2="900"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B0E0BA" stopOpacity={0.16} />
            <stop offset="1" stopColor="#B0E0BA" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_0_3"
            x1="35"
            y1="1041"
            x2="157.5"
            y2="924.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.36" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_0_3"
            x1="35"
            y1="977"
            x2="406"
            y2="977"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_0_3"
            x1="1045"
            y1="977"
            x2="674"
            y2="977"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </AbsoluteFill>
  );
};
