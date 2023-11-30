import React from "react";
import type { z } from "zod";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import type { compositionSchema } from "../../../src/config";
import { Button } from "../../Button/Button";
import { Actions } from "../Actions/Actions";

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

export const Sidebar: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
}> = ({ inputProps }) => {
  return (
    <div style={information}>
      <div style={title}>
        <h2 style={{ margin: 0 }}>@{inputProps.login}</h2>
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
