import type { PlayerRef } from "@remotion/player";
import { useEffect, useMemo, useRef, type SetStateAction } from "react";
import { AbsoluteFill } from "remotion";
import type { Rocket } from "../../../src/config";
import { Button } from "../../Button/Button";
import { ColorPicker } from "./ColorPicker";
import { ModalRocket } from "./ModalRocket";
import styles from "./styles.module.css";

const modalWrapper: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  zIndex: 1,
  justifyContent: "center",
  position: "fixed",
};

const spacer: React.CSSProperties = {
  width: 64,
};

export const RocketPickerModal: React.FC<{
  rocket: Rocket;
  setRocket: React.Dispatch<SetStateAction<Rocket | null>>;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  playerRef: React.RefObject<PlayerRef>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<SetStateAction<boolean>>;
}> = ({ rocket, setRocket, setIsModalOpen, isModalOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonSvg = (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0363 20.2268C18.2087 20.3992 18.4884 20.3992 18.6609 20.2268L20.0236 18.864C20.1961 18.6915 20.1961 18.4119 20.0236 18.2394L12.6981 10.9139C12.5256 10.7414 12.5256 10.4617 12.6981 10.2893L20.0236 2.96373C20.1961 2.79125 20.1961 2.51161 20.0236 2.33912L18.6609 0.976368C18.4884 0.803886 18.2087 0.803886 18.0363 0.976368L10.7107 8.30189C10.5383 8.47437 10.2586 8.47437 10.0861 8.30189L2.76061 0.976368C2.58813 0.803886 2.30848 0.803886 2.136 0.976368L0.773243 2.33912C0.600761 2.51161 0.600761 2.79125 0.773243 2.96373L8.09877 10.2893C8.27125 10.4617 8.27125 10.7414 8.09877 10.9139L0.773243 18.2394C0.600761 18.4119 0.600761 18.6915 0.773243 18.864L2.136 20.2268C2.30848 20.3992 2.58813 20.3992 2.76061 20.2268L10.0861 12.9012C10.2586 12.7288 10.5383 12.7288 10.7107 12.9012L18.0363 20.2268Z"
        fill="white"
      />
    </svg>
  );

  const dynamicBackground: React.CSSProperties = useMemo(() => {
    return {
      ...modalWrapper,
      backgroundColor: isModalOpen ? "rgba(0,0,0,0.5)" : "transparent",
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, setIsModalOpen]);

  const themeName = useMemo(() => {
    const blueTheme = "Glacial Soar";
    const orangeTheme = "Blaze of Fire";
    const yellowTheme = "Golden Ignition";

    return rocket === "blue"
      ? blueTheme
      : rocket === "orange"
        ? orangeTheme
        : yellowTheme;
  }, [rocket]);

  const themeNameColor = useMemo(() => {
    const orange = "#EA4D48";
    const blue = "#456BA9";
    const yellow = "#CCAB60";

    return rocket === "blue" ? blue : rocket === "orange" ? orange : yellow;
  }, [rocket]);

  return (
    <AbsoluteFill style={dynamicBackground}>
      <div ref={modalRef} className={styles.rocketModalContainer}>
        <div className={styles.rocketModalTitleContainer}>
          <h3 className={styles.rocketModalTitle}>Choose your rocket</h3>
          <div style={{ flex: 1 }}> </div>
          <Button
            className={styles.closeButton}
            onClick={() => setIsModalOpen(false)}
          >
            {closeButtonSvg}
          </Button>
        </div>

        <div className={styles.rocketModalInnerContainer}>
          <div className={styles.colorPickerContainer}>
            <ColorPicker
              color={"orange"}
              rocket={rocket}
              setRocket={setRocket}
            />
            <ColorPicker color={"blue"} rocket={rocket} setRocket={setRocket} />
            <ColorPicker
              color={"yellow"}
              rocket={rocket}
              setRocket={setRocket}
            />
            <div style={{ flex: 1 }} />
            <h3 style={{ margin: 0, marginLeft: 16, color: themeNameColor }}>
              {themeName}
            </h3>
          </div>
          <div className={styles.bigRocketContainer}>
            <div style={spacer} />
            <ModalRocket rocket={rocket} />
            <div style={spacer} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
