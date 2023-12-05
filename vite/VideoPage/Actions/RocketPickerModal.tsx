import { useCallback, type SetStateAction } from "react";
import type { RocketColor } from "../page";

const modalStyle: React.CSSProperties = {
  background: "#181B28",
  color: " black",
  zIndex: 10,
  borderRadius: 16,
  boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.04)",
  position: "fixed",
  top: "50%",
  left: "30%",
  padding: 16,
};

const rocketStyle: React.CSSProperties = {
  width: 32,
  cursor: "pointer",
};

const spacer: React.CSSProperties = {
  width: 48,
};

export const RocketPickerModal: React.FC<{
  rocket: RocketColor;
  setRocket: React.Dispatch<SetStateAction<RocketColor>>;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}> = ({ rocket, setRocket, setIsModalOpen }) => {
  // set rocket color based on which one is clicked

  //   const yellowRocket: React.CSSProperties = useMemo(() => {
  //     return {
  //       ...rocketStyle,
  //       backgroundColor: rocket === "yellow" ? "white" : "transparent",
  //     };
  //   }, [rocket]);

  //   const blueRocket: React.CSSProperties = useMemo(() => {
  //     return {
  //       ...rocketStyle,
  //       backgroundColor: rocket === "blue" ? "white" : "transparent",
  //     };
  //   }, [rocket]);

  //   const orangeRocket: React.CSSProperties = useMemo(() => {
  //     return {
  //       ...rocketStyle,
  //       backgroundColor: rocket === "orange" ? "white" : "transparent",
  //     };
  //   }, [rocket]);

  const handleClick = useCallback(
    (selectedRocket: RocketColor) => {
      setRocket(selectedRocket);
      setIsModalOpen(false);
    },
    [setIsModalOpen, setRocket],
  );

  return (
    <div style={modalStyle}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={spacer} />
        <div style={rocketStyle} onClick={() => handleClick("orange")}>
          <img src="/rocket-side-orange.png" style={rocketStyle} />
        </div>
        <div style={spacer} />
        <div style={rocketStyle} onClick={() => handleClick("blue")}>
          <img src="/rocket-side-blue.png" style={rocketStyle} />
        </div>
        <div style={spacer} />
        <div style={rocketStyle} onClick={() => handleClick("yellow")}>
          <img src="/rocket-side-yellow.png" style={rocketStyle} />
        </div>
        <div style={spacer} />
      </div>
    </div>
  );
};
