import { useMemo, type SetStateAction } from "react";
import { Button } from "../../Button/Button";
import type { RocketColor } from "../page";
import styles from "./styles.module.css";

export const RocketPicker: React.FC<{
  rocket: RocketColor;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}> = ({ rocket, setIsModalOpen }) => {
  const source = useMemo(() => {
    return rocket === "orange"
      ? "/rocket-side-orange.png"
      : rocket === "blue"
        ? "/rocket-side-blue.png"
        : "/rocket-side-yellow.png";
  }, [rocket]);

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
      onClick={() => setIsModalOpen(true)}
      className={styles.rocketPicker}
      style={adaptiveBorderColor}
    >
      <img src={source} className={styles.avatarRocket} />
    </Button>
  );
};
