import React, { ReactNode } from "react";

const style: React.CSSProperties = {
  width: 760,
  height: 360,
  background:
    "linear-gradient(to right, rgba(171, 230, 195, 0.5), rgba(65, 90, 135, 0.5))",
  border: "2px solid rgba(171, 230, 195, 1)",
  borderRadius: 20,
  position: "relative",
  padding: "40px 40px 104px",
};

const textLeft: React.CSSProperties = {
  position: "absolute",
  alignSelf: "center",
  left: -120 - 40,
  top: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: 120,
  fontSize: 12,
  textAlign: "right",
  color: "rgba(203, 203, 203, 1)",
};

const textMiddle: React.CSSProperties = {
  position: "absolute",
  alignSelf: "center",
  left: 0,
  right: 0,
  margin: "auto",
  top: -64,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: 120,
  fontSize: 12,
  textAlign: "center",
  color: "rgba(203, 203, 203, 1)",
};

const textRight: React.CSSProperties = {
  position: "absolute",
  alignSelf: "center",
  right: -144 - 40,
  top: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: 144,
  fontSize: 12,
  textAlign: "left",
  color: "rgba(203, 203, 203, 1)",
};

export const GradientBox: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <div style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/decoration.svg"
        alt="decoration around the gradient box"
        style={{ width: 852, position: "absolute", top: -60, left: -48 }}
      />
      <div style={textLeft}>A personalized video made just for you</div>
      <div style={textMiddle}>Your favorite Github statistics, animated</div>
      <div style={textRight}>An MP4 video to share with your community</div>
      {props.children}
    </div>
  );
};
