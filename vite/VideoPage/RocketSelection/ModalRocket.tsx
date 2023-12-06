import type { SetStateAction } from "react";
import { useCallback, useMemo, useState } from "react";
import { staticFile } from "remotion";
import type { RocketColor } from "../page";
import styles from "./styles.module.css";

const rocketWrapper: React.CSSProperties = {
  width: 64,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
};

const rocketStyle: React.CSSProperties = {
  width: 64,
  cursor: "pointer",
};

const isIosSafari = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const isSafari = Boolean(
    navigator.userAgent.match(/Version\/[\d.]+.*Safari/),
  );
  const isChrome = Boolean(navigator.userAgent.match(/CriOS\//));
  return isSafari || isChrome;
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

  const safariSrc = staticFile(
    "FootageCrate-4K_Rocket_Exhaust_Orange_Angle_Front-prores-hevc-safari.mp4",
  );
  const otherSrc = staticFile(
    "FootageCrate-4K_Rocket_Exhaust_Orange_Angle_Front-prores-vp9-chrome.webm",
  );
  const fireSource = isIosSafari() ? safariSrc : otherSrc;

  const handleClick = useCallback(
    (selectedRocket: RocketColor) => {
      setRocket(selectedRocket);
      setIsModalOpen(false);
    },
    [setIsModalOpen, setRocket],
  );
  return (
    <div
      className={styles.rocketPicker}
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
          style={{ height: 48, transform: "rotate(-90deg)", marginLeft: 4 }}
        />
      ) : null}
    </div>
  );
};
