import { Link, useParams } from "@tanstack/react-router";
import React, { useMemo } from "react";
import type { z } from "zod";
import type { CompositionProps } from "../../types/constants";
import { userRoute } from "../routing";
import { VideoBox } from "./VideoBox";
import styles from "./styles.module.css";

const outer: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: 0,
  backgroundColor: "#000",
};

const background: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundImage: "url(/videopagebackground.png)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "absolute",
};

const container: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
};

export const UserPage = () => {
  const params = useParams({ from: userRoute });
  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: params.username,
    };
  }, [params.username]);

  return (
    <div style={outer}>
      <div style={background} id="videobackground" />
      <div style={container}>
        <div className={styles.mobileTitle}>
          <h2 className={styles.gradientText} style={{ margin: 0 }}>
            <Link to={"/"}>#GitHubUnwrapped 2023</Link>
          </h2>
          <h2 style={{ margin: 0 }}>@{inputProps.title}</h2>
        </div>
        <VideoBox inputProps={inputProps} />
      </div>
    </div>
  );
};
