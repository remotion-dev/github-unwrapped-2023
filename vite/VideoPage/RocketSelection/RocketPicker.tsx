import type { PlayerRef } from "@remotion/player";
import { useCallback, useMemo, type SetStateAction } from "react";
import { Button } from "../../Button/Button";
import type { RocketColor } from "../page";
import styles from "./styles.module.css";

export const RocketPicker: React.FC<{
  rocket: RocketColor;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsPlaying: React.Dispatch<SetStateAction<boolean>>;
  playerRef: React.RefObject<PlayerRef>;
}> = ({ rocket, setIsModalOpen, setIsPlaying, playerRef }) => {
  const source = useMemo(() => {
    return rocket === "orange"
      ? "/rocket-side-orange.png"
      : rocket === "blue"
        ? "/rocket-side-blue.png"
        : "/rocket-side-yellow.png";
  }, [rocket]);

  const handleClick = useCallback(() => {
    const { current } = playerRef;
    if (current) {
      current.pause();
    }

    setIsPlaying(false);
    setIsModalOpen(true);
  }, [setIsPlaying, playerRef, setIsModalOpen]);

  const adaptiveBorderColor: React.CSSProperties = useMemo(() => {
    const orange = "#A93B10";
    const blue = "#414DD5";
    const yellow = "#E4B929";

    const currentColor =
      rocket === "orange" ? orange : rocket === "blue" ? blue : yellow;

    return {
      borderColor: currentColor,
    };
  }, [rocket]);

  return (
    <Button
      onClick={handleClick}
      className={styles.rocketPicker}
      style={adaptiveBorderColor}
    >
      <img src={source} className={styles.avatarRocket} />
    </Button>
  );
};
