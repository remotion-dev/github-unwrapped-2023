import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { LanguagePlanet } from "./TopLanguages/Language";
import { mapLanguageToPlanet } from "./TopLanguages/constants";

const Title: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        fontSize: 55,
        fontFamily: "Mona Sans",
        fontWeight: "bold",
        color: "white",
        top: 14,
        left: 20,
      }}
    >
      @username
    </div>
  );
};

const Planets: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 158,
        left: 1090,
        width: 360,
        height: 175,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 20,
        flexDirection: "row",
      }}
    >
      <LanguagePlanet
        planetInfo={mapLanguageToPlanet.Java}
        style={{
          height: 100,
        }}
      />
      <LanguagePlanet
        planetInfo={mapLanguageToPlanet.PHP}
        style={{
          height: 100,
        }}
      />
      <LanguagePlanet
        planetInfo={mapLanguageToPlanet.Go}
        style={{
          height: 100,
        }}
      />
    </div>
  );
};

const PullRequests: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 138,
        left: 290,
        width: 180,
        height: 110,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 20,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          style={{
            height: 50,
            marginRight: 10,
          }}
        >
          <path
            fill="white"
            d="M80 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm32.4 97.2c28-12.4 47.6-40.5 47.6-73.2c0-44.2-35.8-80-80-80S0 35.8 0 80c0 32.8 19.7 61 48 73.3V358.7C19.7 371 0 399.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-32.8-19.7-61-48-73.3V272c26.7 20.1 60 32 96 32h86.7c12.3 28.3 40.5 48 73.3 48c44.2 0 80-35.8 80-80s-35.8-80-80-80c-32.8 0-61 19.7-73.3 48H208c-49.9 0-91-38.1-95.6-86.8zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM344 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
          />
        </svg>
        <div
          style={{
            fontFamily: "Mona Sans",
            fontWeight: "500",
            color: "white",
            fontSize: 65,
            lineHeight: 1,
          }}
        >
          12
        </div>
      </div>
      <div
        style={{
          fontFamily: "Mona Sans",
          fontSize: 20,
          color: "white",
          fontWeight: 500,
        }}
      >
        PRs merged
      </div>
    </div>
  );
};

const Stars: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 138,
        left: 40,
        width: 210,
        height: 110,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 20,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <svg
          style={{
            height: 50,
            marginRight: 10,
          }}
          viewBox="0 0 576 512"
        >
          <path
            fill="white"
            d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
          />
        </svg>
        <div
          style={{
            fontFamily: "Mona Sans",
            fontWeight: "500",
            color: "white",
            fontSize: 65,
            lineHeight: 1,
          }}
        >
          65
        </div>
      </div>
      <div
        style={{
          fontFamily: "Mona Sans",
          fontSize: 20,
          color: "white",
          fontWeight: 500,
        }}
      >
        Repos starred
      </div>
    </div>
  );
};

export const Overlay: React.FC = () => {
  return (
    <AbsoluteFill>
      <Title />
      <Stars />
      <PullRequests />
      <Planets />
    </AbsoluteFill>
  );
};

export const OgImage: React.FC = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Img src={staticFile("og-image-background.png")} />
      </AbsoluteFill>
      <AbsoluteFill>
        <div
          style={{
            height: 630,
            width: 1500,
            transform: `matrix3d(0.690392, 0.015822, 0, 0.00019, 
              0, 0.609524, 0, 0, 
              0, 0, 1, 0, 
              101, 88, 0, 1)`,
            transformOrigin: "0px 0px 0px",
          }}
        >
          <Overlay />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
