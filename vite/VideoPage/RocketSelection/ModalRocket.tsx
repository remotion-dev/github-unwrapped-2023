import type { SetStateAction } from "react";
import { useCallback, useMemo, useState } from "react";
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
  width: 139,
  height: 300,
  cursor: "pointer",
};

export const ModalRocket: React.FC<{
  setRocket: React.Dispatch<SetStateAction<RocketColor>>;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  rocket: RocketColor;
}> = ({ rocket, setRocket, setIsModalOpen }) => {
  const [isHovering, setIsHovering] = useState(false);
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
    <div
      style={rocketWrapper}
      onClick={() => handleClick(rocket)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={source} style={rocketStyle} />
      {isHovering ? (
        <video
          src={fireSource}
          muted
          loop
          autoPlay
          style={{
            height: 64,
            transform: "rotate(-90deg)",
            marginLeft: 6,
            marginTop: 10,
          }}
        />
      ) : (
        <div style={{ height: 74 }} />
      )}
    </div>
  );
};
