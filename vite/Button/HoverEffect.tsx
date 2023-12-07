import React, { useEffect, useRef } from "react";
import { AbsoluteFill } from "remotion";
import styles from "./shine.module.css";

const getPos = (e: PointerEvent, current: HTMLDivElement) => {
  const clientRct = current.getBoundingClientRect();
  const x = e.clientX - clientRct.left;
  const y = e.clientY - clientRct.top;
  return { x, y };
};

export const HoverEffect: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = container;
    if (!current) return;
    const onPointerEnter = (e: PointerEvent) => {
      const pos = getPos(e, current);
      shine.current!.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

      const onMouseMove = (pointer: PointerEvent) => {
        const pos2 = getPos(pointer, current);
        shine.current!.style.transform = `translate(${pos2.x}px, ${pos2.y}px)`;
        shine.current!.classList.add(styles.visible);
      };

      const onMouseLeave = () => {
        current.removeEventListener("pointermove", onMouseMove);
        shine.current!.classList.remove(styles.visible);
      };

      current.addEventListener("pointermove", onMouseMove);
      current.addEventListener("pointerleave", onMouseLeave, { once: true });
    };

    container.current?.addEventListener("pointerenter", onPointerEnter);
  }, []);

  return (
    <AbsoluteFill
      ref={container}
      style={{
        left: -1,
        top: -1,
        right: -1,
        bottom: -1,
        width: undefined,
        height: undefined,
      }}
    >
      <div
        ref={shine}
        className={styles.shine}
        style={{
          height: 200,
          width: 200,
          marginLeft: -100,
          marginTop: -100,
          position: "absolute",
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.1), transparent 70%)",
        }}
      />
    </AbsoluteFill>
  );
};
