import type { ReactNode } from "react";
import { ChevronRight } from "../../../icons/ChevronRight";
import styles from "./styles.module.css";

export const FurtherAction: React.FC<{
  icon: (params: { width: number }) => ReactNode;
  label: string;
  onClick?: () => void;
}> = (props) => {
  return (
    <div className={styles.furtherActionWrapper} onClick={props.onClick}>
      <div className={styles.furtherActionIconContainer}>
        {props.icon({ width: 16 })}
      </div>
      {props.label}
      <ChevronRight height={12} />
    </div>
  );
};
