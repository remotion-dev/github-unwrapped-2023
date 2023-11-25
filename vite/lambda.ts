import type { RenderMediaOnLambdaOutput } from "@remotion/lambda/client";
import type { z } from "zod";
import type { RenderRequest, compositionSchema } from "../src/config";
import type { ApiResponse } from "../src/helpers/api-response";
import type { ProgressRequest, ProgressResponse } from "../types/schema";
import { frontendCredentials } from "./env";

const makeRequest = async <Res>(
  endpoint: string,
  body: unknown,
): Promise<Res> => {
  const result = await fetch(frontendCredentials().VITE_HOST + endpoint, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
  const json = (await result.json()) as ApiResponse<Res>;
  if (json.type === "error") {
    throw new Error(json.message);
  }

  return json.data;
};

export const renderVideo = ({
  id,
  inputProps,
}: {
  id: string;
  inputProps: z.infer<typeof compositionSchema>;
}) => {
  const body: z.infer<typeof RenderRequest> = {
    id,
    inputProps,
  };

  return makeRequest<RenderMediaOnLambdaOutput>("/api/render", body);
};

export const getProgress = ({
  id,
  bucketName,
}: {
  id: string;
  bucketName: string;
}) => {
  const body: z.infer<typeof ProgressRequest> = {
    id,
    bucketName,
  };

  return makeRequest<ProgressResponse>("/api/lambda/progress", body);
};
