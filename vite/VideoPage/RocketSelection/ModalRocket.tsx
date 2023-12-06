import type { SetStateAction } from "react";
import { useCallback, useMemo } from "react";
import { getFlame } from "../../../remotion/Opening/TakeOff";
import type { RocketColor } from "../page";

const rocketWrapper: React.CSSProperties = {
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
};

const rocketStyle: React.CSSProperties = {
  maxHeight: 300,
  cursor: "pointer",
  zIndex: 1,
};

export const ModalRocket: React.FC<{
  setRocket: React.Dispatch<SetStateAction<RocketColor>>;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  rocket: RocketColor;
}> = ({ rocket, setRocket, setIsModalOpen }) => {
  const source = useMemo(() => {
    return rocket === "orange"
      ? "/rocket-side-orange.png"
      : rocket === "blue"
        ? "/rocket-side-blue.png"
        : "/rocket-side-yellow.png";
  }, [rocket]);

  const fireSource = rocket ? getFlame(rocket) : undefined;

  const handleClick = useCallback(
    (selectedRocket: RocketColor) => {
      setRocket(selectedRocket);
      setIsModalOpen(false);
    },
    [setIsModalOpen, setRocket],
  );
  return (
    <div style={rocketWrapper} onClick={() => handleClick(rocket)}>
      <img src={source} style={rocketStyle} />

      <video
        src={fireSource}
        muted
        loop
        autoPlay
        style={{
          height: 64,
          transform: "rotate(-90deg)",
          marginLeft: 6,
          marginTop: 6,
        }}
      />
    </div>
  );
};
