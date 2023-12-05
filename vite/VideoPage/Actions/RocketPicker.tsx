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
  return (
    <div>
      <Button
        style={{ border: "none", backgroundColor: "transparent" }}
        onClick={() => setIsModalOpen(true)}
        className={styles.rocketPicker}
      >
        <img src={source} style={{ width: 20 }} />
      </Button>
    </div>
  );
};
