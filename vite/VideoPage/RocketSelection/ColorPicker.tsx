import type { SetStateAction } from "react";
import { useEffect, useMemo, useRef } from "react";
import { Button } from "../../Button/Button";
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
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
};

export const ColorPicker: React.FC<{
  color: RocketColor;
  rocket: RocketColor;
  setRocket: React.Dispatch<SetStateAction<RocketColor>>;
}> = ({ color, rocket, setRocket }) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const fillColor = useMemo(() => {
    const orange = "#EA4D48";
    const blue = "#456BA9";
    const yellow = "#CCAB60";

    return color === "blue" ? blue : color === "orange" ? orange : yellow;
  }, [color]);

  const setFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  useEffect(() => {
    if (color === rocket) {
      setFocus();
    }
  }, [color, rocket]);

  const dynamicPickerStyle = useMemo(() => {
    return {
      ...pickerStyle,
      borderColor: color === rocket ? "#507EFF" : "#373945",
    };
  }, [color, rocket]);

  return (
    <Button
      ref={ref}
      style={dynamicPickerStyle}
      onClick={() => setRocket(color)}
    >
      <div
        style={{
          color: "red",
          backgroundColor: fillColor,
          height: 20,
          width: 20,
          borderRadius: 10,
        }}
      />
    </Button>
  );
};
