import { AbsoluteFill } from "remotion";

export const IssueGridRight: React.FC = () => {
  return (
    <AbsoluteFill>
      <svg
        width="1080"
        height="1080"
        viewBox="0 0 1080 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="abc" fill="white">
          <path d="M588 841H1045V1021C1045 1032.05 1036.05 1041 1025 1041H588V841Z" />
        </mask>
        <path
          d="M588 841H1045V1021C1045 1032.05 1036.05 1041 1025 1041H588V841Z"
          fill="url(#gradientright)"
        />
        <path
          d="M588 841H1045H588ZM1046 1021C1046 1032.6 1036.6 1042 1025 1042H588V1040H1025C1035.49 1040 1044 1031.49 1044 1021H1046ZM588 1041V841V1041ZM1046 841V1021C1046 1032.6 1036.6 1042 1025 1042V1040C1035.49 1040 1044 1031.49 1044 1021V841H1046Z"
          fill="url(#paintright)"
          mask="url(#abc)"
        />
        <line
          x1="674"
          y1="976.5"
          x2="1044"
          y2="976.5"
          stroke="url(#paint2right)"
          strokeOpacity="0.28"
        />
        <defs>
          <linearGradient
            id="gradientright"
            x1="1045"
            y1="1041"
            x2="947.537"
            y2="862.85"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B0E0BA" stopOpacity={0.16} />
            <stop offset="1" stopColor="#B0E0BA" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paintright"
            x1="1045"
            y1="1031.5"
            x2="951.342"
            y2="917.665"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.36" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2right"
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
