import type { RenderMediaOnLambdaOutput } from "@remotion/lambda/client";
import type { z } from "zod";
import type { ApiResponse } from "../helpers/api-response";
import { frontendCredentials } from "../helpers/domain";
import type { CompositionProps } from "../types/constants";
import type {
  ProgressRequest,
  ProgressResponse,
  RenderRequest,
} from "../types/schema";

const makeRequest = async <Res>(
  endpoint: string,
  body: unknown
): Promise<Res> => {
  const result = await fetch(
    frontendCredentials().NEXT_PUBLIC_API_URL + endpoint,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    }
  );
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
  inputProps: z.infer<typeof CompositionProps>;
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
