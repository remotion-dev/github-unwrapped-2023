import type { ButtonHTMLAttributes } from "react";
import React, { forwardRef } from "react";
import { AbsoluteFill } from "remotion";
import { Spacing } from "../Spacing";
import { Spinner } from "../Spinner/Spinner";
import { HoverEffect } from "./HoverEffect";
import styles from "./styles.module.css";

const ButtonForward: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    loading?: boolean;
    secondary?: boolean;
    style?: React.CSSProperties;
    className?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    hoverEffect?: boolean;
  }
> = (
  {
    onClick,
    disabled,
    children,
    loading,
    secondary,
    style,
    className,
    type,
    hoverEffect,
  },
  ref,
) => {
  return (
    <button
      ref={ref}
      // eslint-disable-next-line react/button-has-type
      type={type ?? "button"}
      className={[
        styles.button,
        secondary ? styles.secondarybutton : undefined,
        className ? className : undefined,
      ].join(" ")}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {hoverEffect ? <HoverEffect /> : null}
      {loading && (
        <>
          <Spinner size={20} />
          <Spacing />
        </>
      )}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
          flexDirection: "row",
        }}
      >
        {children}
      </AbsoluteFill>
    </button>
  );
};

export const Button = forwardRef(ButtonForward);
