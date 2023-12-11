import type { SetStateAction } from "react";
import { useEffect, useMemo, useRef } from "react";
import type { Rocket } from "../../../src/config";
import { Button } from "../../Button/Button";

const DIAMETER = 32;
const pickerStyle: React.CSSProperties = {
  width: DIAMETER,
  height: DIAMETER,
  borderRadius: DIAMETER / 2,
  margin: 0,
  padding: 0,
  backgroundColor: "transparent",
  border: "2px solid #373945",
  cursor: "pointer",
  flexShrink: 0,
};

export const ColorPicker: React.FC<{
  color: Rocket;
  rocket: Rocket;
  setRocket: React.Dispatch<SetStateAction<Rocket | null>>;
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
          display: "block",
          backgroundColor: fillColor,
          height: 20,
          width: 20,
          borderRadius: 10,
        }}
      />
    </Button>
  );
};
