import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const PRODUCTIVITY_SEQUENCE_DURATION = 120;
const barBackground = "rgb(0,0,0)";
const barColor = "rgb(133,134,214)";

type ProductivityPerHour = {
  time: number;
  productivity: number;
};

type Props = {
  graphData: Array<ProductivityPerHour>;
};

const Bar = (props: { productivity: number }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const height = spring({
    fps,
    frame,
    from: 0,
    to: 100,
    config: {
      mass: props.productivity * 20,
      damping: 200,
    },
  });

  return (
    <div
      style={{
        width: 24,
        height: `${height}%`,
        background: barBackground,
        display: "flex",
        alignItems: "flex-end",
        borderRadius: 16,
      }}
    >
      <div
        style={{
          background: barColor,
          width: "100%",
          height: `${props.productivity * 100}%`,
          borderRadius: 16,
        }}
      />
    </div>
  );
};

const Graph = (props: { productivityPerHour: Array<ProductivityPerHour> }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 16,
        height: 480,
        marginBottom: 120,
      }}
    >
      {props.productivityPerHour.map((productivityPerHour) => {
        return (
          <div
            key={productivityPerHour.time}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Bar productivity={productivityPerHour.productivity} />
            <div
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: 700,
                fontFamily: "Mona Sans",
              }}
            >
              {productivityPerHour.time}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Productivity: React.FC<Props> = ({ graphData }) => {
  return (
    <AbsoluteFill
      style={{
        background: "rgb(21,20,39)",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          color: "white",
          position: "absolute",
          top: 48,
          left: 48,
          fontSize: 120,
          fontFamily: "Mona Sans",
          fontWeight: 800,
        }}
      >
        Monday
      </div>
      <Graph productivityPerHour={graphData} />
    </AbsoluteFill>
  );
};
