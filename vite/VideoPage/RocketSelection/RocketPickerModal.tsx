import { useEffect, useMemo, useRef, type SetStateAction } from "react";
import { AbsoluteFill } from "remotion";
import type { RocketColor } from "../page";
import { ColorPicker } from "./ColorPicker";
import { ModalRocket } from "./ModalRocket";
import styles from "./styles.module.css";

const modalWrapper: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9,
};

const spacer: React.CSSProperties = {
  width: 64,
};

export const RocketPickerModal: React.FC<{
  rocket: RocketColor;
  setRocket: React.Dispatch<SetStateAction<RocketColor>>;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
}> = ({ rocket, setRocket, setIsModalOpen, isModalOpen }) => {
  // set rocket color based on which one is clicked
  const modalRef = useRef<HTMLDivElement>(null);

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
    const blueTheme = "The icy king";
    const orangeTheme = "The firefly";
    const yellowTheme = "The golden...";

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
          <h3 style={{ margin: 0 }}>Choose your rocket</h3>
        </div>

        <div className={styles.rocketModalInnerContainer}>
          <div className={styles.colorPickerContainer}>
            <ColorPicker
              color={"orange"}
              rocket={rocket}
              setRocket={setRocket}
            />
            <div style={{ width: 16 }} />
            <ColorPicker color={"blue"} rocket={rocket} setRocket={setRocket} />
            <div style={{ width: 16 }} />
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
            <ModalRocket
              rocket={rocket}
              setRocket={setRocket}
              setIsModalOpen={setIsModalOpen}
            />
            <div style={spacer} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
