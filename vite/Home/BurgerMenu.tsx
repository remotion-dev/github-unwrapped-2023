import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { animated, useTransition } from "react-spring";
import styles from "./burger.module.css";

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const transition = useTransition(isOpen, {
    config: { mass: 20, clamp: true },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div style={style} className={styles.navWrapper}>
              <ul>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/">
                    Home
                  </Link>
                </li>

                {/* <li>
              <Link onClick={() => setIsOpen(false)} to="team/">
                Team
              </Link>
            </li> */}

                {/* <li>
              <Link onClick={() => setIsOpen(false)} to="event/">
                Event
              </Link>
            </li>

            <li>
              <Link onClick={() => setIsOpen(false)} to="anmeldung/">
                Anmelden
              </Link>
            </li> */}

                <li>
                  <Link onClick={() => setIsOpen(false)} to="/kontakt">
                    Kontakt
                  </Link>
                </li>
              </ul>
            </animated.div>
          ),
      )}
      <div className={styles.icon} onClick={() => setIsOpen((o) => !o)}>
        <div
          className={
            isOpen
              ? [styles.menui, styles.topMenu, styles.topAnimate].join(" ")
              : [styles.menui, styles.topMenu].join(" ")
          }
        />
        <div
          className={
            isOpen
              ? [styles.menui, styles.midMenu, styles.midAnimate].join(" ")
              : [styles.menui, styles.midMenu].join(" ")
          }
        />
        <div
          className={
            isOpen
              ? [styles.menui, styles.bottomMenu, styles.bottomAnimate].join(
                  " ",
                )
              : [styles.menui, styles.bottomMenu].join(" ")
          }
        />
      </div>
    </>
  );
};
