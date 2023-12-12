import type { ReactNode } from "react";
import React, { useCallback, useEffect } from "react";
import type { CompositionParameters, ProfileStats } from "../src/config";
import { NotFound } from "./NotFound/NotFound";
import type { LoadingState } from "./VideoPage/Sidebar/DownloadButton";
import type { RenderStatus } from "./VideoPage/useVideo";
import { useVideo } from "./VideoPage/useVideo";
import { useCompositionParams } from "./VideoPage/user-page";

type ContextType = {
  compositionParams: CompositionParameters;
  setRocket: React.Dispatch<
    React.SetStateAction<CompositionParameters["rocket"] | null>
  >;
  status: RenderStatus;
  loadingState: LoadingState;
  setLoadingState: React.Dispatch<React.SetStateAction<LoadingState>>;
};

const UserVideoContext = React.createContext<ContextType | null>(null);

const UserVideoProvider: React.FC<{
  children: ReactNode;
  user: ProfileStats;
}> = ({ children, user }) => {
  const { compositionParams, setRocket } = useCompositionParams(user);
  const status = useVideo({
    theme: compositionParams.rocket,
    username: compositionParams.login,
  });
  const [loadingState, setLoadingState] = React.useState<LoadingState>({
    type: "no-file",
  });

  const contextValue: ContextType = React.useMemo(() => {
    return {
      compositionParams,
      setRocket,
      status,
      loadingState,
      setLoadingState,
    };
  }, [compositionParams, loadingState, setRocket, status]);

  const fetchFile = useCallback(async () => {
    if (status.type !== "video-available") {
      setLoadingState({ type: "no-file" });
      return;
    }

    const response = await fetch(status.url);
    const contentLength = Number(
      response.headers.get("Content-Length") as string,
    );

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();

    let receivedLength = 0;
    const chunks = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      setLoadingState({
        type: "downloading",
        progress: receivedLength / contentLength,
      });
      // console.log(`Received ${receivedLength} of ${contentLength}`);
    }

    const chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (const chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }

    const downloadedFile = new File([chunksAll], "github_unwrapped.mp4", {
      type: "video/mp4",
    });

    setLoadingState({ type: "downloaded", file: downloadedFile });
  }, [setLoadingState, status]);

  useEffect(() => {
    fetchFile();
  }, [fetchFile]);

  return (
    <UserVideoContext.Provider value={contextValue}>
      {children}
    </UserVideoContext.Provider>
  );
};

export const UserVideoContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const user = window.__USER__;

  if (user === "not-found") {
    return <NotFound code="404" />;
  }

  return <UserVideoProvider user={user}>{children}</UserVideoProvider>;
};

export const useUserVideo = () => {
  const context = React.useContext(UserVideoContext);
  if (context === undefined || context === null) {
    throw new Error("useUserVideo must be used within a UserVideoProvider");
  }

  return context;
};
