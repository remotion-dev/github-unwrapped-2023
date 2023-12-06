import React from "react";
import styles from "./styles.module.css";

export const Input: React.FC<{
  text: string;
  setText: (v: string) => void;
  disabled?: boolean;
  placeHolder?: string;
  style?: React.CSSProperties;
  invalid?: boolean;
  className?: string;
}> = ({ text, setText, disabled, placeHolder, style, invalid, className }) => {
  return (
    <input
      className={[
        className ? className : undefined,
        styles.input,
        invalid ? styles.invalid : undefined,
      ].join(" ")}
      disabled={disabled}
      name="title"
      value={text}
      onChange={(v) => setText(v.target.value)}
      placeholder={placeHolder}
      style={style}
    />
  );
};
