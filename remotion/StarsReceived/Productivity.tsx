import {
  AbsoluteFill,
  random,
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

export const Productivity: React.FC = () => {
  const graphData: Array<ProductivityPerHour> = [
    { time: 4, productivity: random(null) },
    { time: 5, productivity: random(null) },
    { time: 6, productivity: random(null) },
    { time: 7, productivity: random(null) },
    { time: 8, productivity: random(null) },
    { time: 9, productivity: random(null) },
    { time: 10, productivity: random(null) },
    { time: 11, productivity: random(null) },
    { time: 12, productivity: random(null) },
    { time: 13, productivity: random(null) },
    { time: 14, productivity: random(null) },
    { time: 15, productivity: random(null) },
    { time: 16, productivity: random(null) },
    { time: 17, productivity: random(null) },
    { time: 18, productivity: random(null) },
    { time: 19, productivity: random(null) },
    { time: 20, productivity: random(null) },
    { time: 21, productivity: random(null) },
    { time: 22, productivity: random(null) },
    { time: 23, productivity: random(null) },
    { time: 24, productivity: random(null) },
    { time: 1, productivity: random(null) },
    { time: 2, productivity: random(null) },
    { time: 3, productivity: random(null) },
  ];
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
