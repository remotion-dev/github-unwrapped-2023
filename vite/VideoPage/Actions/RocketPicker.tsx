import { useMemo, type SetStateAction } from "react";
import { Button } from "../../Button/Button";
import type { RocketColor } from "../page";

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
        style={{ border: "none", backgroundColor: "" }}
        onClick={() => setIsModalOpen(true)}
      >
        <img src={source} style={{ width: 16 }} />
      </Button>
    </div>
  );
};
