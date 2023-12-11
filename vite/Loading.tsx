// import { HomeForeground } from "./Home/HomeForeground";
// import { Navbar } from "./Home/Navbar";
// import { Planet } from "./Home/Planet";
// import { HomeBox } from "./HomeBox/HomeBox";
import { useEffect } from "react";
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
      // TODO
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((res) => {
        window.location.href = `/${username}`;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => {
        // TODO
        console.log(err);
      });
  }, [username]);

  return (
    <div className={styles.container}>
      <RadialGradient />
      {/* <Stars /> */}
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
        <div
          style={{
            width: 144,
            height: 6,
            borderRadius: 6,
            overflow: "hidden",
            background: "rgba(255,255,255,0.1)",
            marginTop: 48,
          }}
        >
          <div
            className={styles.animateProgress}
            style={{ height: 12, background: "white" }}
          />
        </div>
        {/* <p style={{ width: 144, textAlign: "center" }}>Unwrapping...</p> */}
      </div>
    </div>
  );
};
