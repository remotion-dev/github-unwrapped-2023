import { Link } from "@tanstack/react-router";
import React from "react";
import type { z } from "zod";
import { DownloadIcon } from "../../icons/DownloadIcon";
import type { CompositionProps } from "../../types/constants";
import { Button } from "../Button/Button";
import { Actions } from "./Actions";

const downloadContent: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const information: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 16,
  minWidth: 350,
};

const title: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const hashtag: React.CSSProperties = {
  background: "linear-gradient(270.02deg, #645278 20.63%, #82B6C6 99.87%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  margin: 0,
};

export const Sidebar: React.FC<{
  inputProps: z.infer<typeof CompositionProps>;
}> = ({ inputProps }) => {
  return (
    <div style={information}>
      <div style={title}>
        <Link to={"/"}>
          <h2 style={hashtag}>#GitHubUnwrapped</h2>
        </Link>
        <h2 style={{ margin: 0 }}>@{inputProps.title}</h2>
      </div>
      <div style={downloadContent}>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            alignItems: "center",
            fontWeight: 700,
          }}
        >
          Download Video <DownloadIcon width={20} color="white" />
        </Button>
      </div>
      <div style={{ flex: 1 }} />
      <Actions />
    </div>
  );
};
