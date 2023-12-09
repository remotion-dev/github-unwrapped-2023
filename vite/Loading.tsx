// import { HomeForeground } from "./Home/HomeForeground";
// import { Navbar } from "./Home/Navbar";
// import { Planet } from "./Home/Planet";
import { useEffect } from "react";
import { Stars } from "./Home/Stars";
// import { HomeBox } from "./HomeBox/HomeBox";
import { RadialGradient } from "./RadialGradient";
import styles from "./styles.module.css";

export const Loading = () => {
  const username = window.location.pathname.split("/")[2];

  useEffect(() => {
    fetch("/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    })
      .then((res) => {
        window.location.href = `/${username}`;
      })
      .catch((err) => {
        // TODO
      });
  }, [username]);

  return (
    <div className={styles.container}>
      <RadialGradient />
      <Stars />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{
            width: 144,
          }}
          src="/walking-octocat.gif"
          alt="loading"
        />
        <p style={{ width: 144, textAlign: "center" }}>Loading...</p>
      </div>
    </div>
  );
};
