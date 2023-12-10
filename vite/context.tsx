import type { ReactNode } from "react";
import React from "react";
import type { ProfileStats } from "../src/server/db";
import { NotFound } from "./NotFound/NotFound";
import type { RenderStatus } from "./VideoPage/useVideo";
import { useVideo } from "./VideoPage/useVideo";
import { useCompositionParams } from "./VideoPage/user-page";
import type { CompositionParameters } from "./VideoPage/utils";

const UserVideoContext = React.createContext<{
  compositionParams: CompositionParameters;
  setRocket: React.Dispatch<
    React.SetStateAction<CompositionParameters["rocket"] | null>
  >;
  status: RenderStatus;
} | null>(null);

const UserVideoProvider: React.FC<{
  children: ReactNode;
  user: ProfileStats;
}> = ({ children, user }) => {
  const { compositionParams, setRocket } = useCompositionParams(user);
  const status = useVideo({
    theme: compositionParams.rocket,
    username: compositionParams.login,
  });

  const value = React.useMemo(() => {
    return {
      compositionParams,
      setRocket,
      status,
    };
  }, [compositionParams, setRocket, status]);

  return (
    <UserVideoContext.Provider value={value}>
      {children}
    </UserVideoContext.Provider>
  );
};

export const UserVideoContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const user = window.__USER__;

  if (user === null) {
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
