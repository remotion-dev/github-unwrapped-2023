import React from "react";
import { PATH_TARGET } from "./make-random-path";

export const MergeStat: React.FC<{
  num: number;
  totalNum: number;
}> = ({ num, totalNum }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: 350,
        width: 350,
        borderRadius: "50%",
        position: "absolute",
        left: PATH_TARGET.x,
        top: PATH_TARGET.y,
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
          style={{
            height: 80,
          }}
        >
          <path
            fill="#3B276C"
            d="M80 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm32.4 97.2c28-12.4 47.6-40.5 47.6-73.2c0-44.2-35.8-80-80-80S0 35.8 0 80c0 32.8 19.7 61 48 73.3V358.7C19.7 371 0 399.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-32.8-19.7-61-48-73.3V272c26.7 20.1 60 32 96 32h86.7c12.3 28.3 40.5 48 73.3 48c44.2 0 80-35.8 80-80s-35.8-80-80-80c-32.8 0-61 19.7-73.3 48H208c-49.9 0-91-38.1-95.6-86.8zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM344 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
          />
        </svg>
        <div
          style={{
            fontSize: 110,
            fontFamily: "Mona Sans",
            fontWeight: "800",
            marginLeft: 10,
            color: "#3B276C",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {num}
        </div>
      </div>
      <div
        style={{
          fontSize: 30,
          fontFamily: "Mona Sans",
          fontWeight: "800",
          color: "#3B276C",
        }}
      >
        pull {totalNum === 1 ? "request" : "requests"}
        <br />
        merged
      </div>
    </div>
  );
};
