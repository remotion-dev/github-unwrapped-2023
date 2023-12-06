import type { SetStateAction } from "react";
import { useMemo } from "react";
import type { RocketColor } from "../page";

const DIAMETER = 31;
const pickerStyle: React.CSSProperties = {
  width: DIAMETER,
  height: DIAMETER,
  borderRadius: DIAMETER / 2,
  margin: 0,
  padding: 0,
  backgroundColor: "transparent",
  border: "2px solid #373945",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const ColorPicker: React.FC<{
  color: RocketColor;
  rocket: RocketColor;
  setRocket: React.Dispatch<SetStateAction<RocketColor>>;
}> = ({ color, rocket, setRocket }) => {
  const fillColor = useMemo(() => {
    const orange = "#EA4D48";
    const blue = "#456BA9";
    const yellow = "#CCAB60";

    return color === "blue" ? blue : color === "orange" ? orange : yellow;
  }, [color]);

  const dynamicPickerStyle = useMemo(() => {
    return {
      ...pickerStyle,
      borderColor: color === rocket ? "#507EFF" : "#373945",
    };
  }, [color, rocket]);

  return (
    <div>
      <div style={dynamicPickerStyle} onClick={() => setRocket(color)}>
        <div
          style={{
            color: "red",
            backgroundColor: fillColor,
            height: 20,
            width: 20,
            borderRadius: 10,
          }}
        />
      </div>
    </div>
  );
};
