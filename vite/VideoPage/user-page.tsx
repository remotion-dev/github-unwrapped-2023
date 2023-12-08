import { useEffect, useMemo, useState } from "react";
import type { z } from "zod";
import type { RenderRequest, Rocket } from "../../src/config";
import type { ProfileStats } from "../../src/server/db";
import { Navbar } from "../Home/Navbar";
import { NotFound } from "../NotFound/NotFound";
import { VideoPageBackground } from "./Background";
import { VideoBox } from "./VideoBox";
import styles from "./styles.module.css";
import { computeCompositionParameters } from "./utils";
declare global {
  interface Window {
    __USER__: ProfileStats | null;
  }
}

const useCompositionParams = (user: ProfileStats) => {
  const compositionParams = useMemo(() => {
    return computeCompositionParameters(user);
  }, [user]);
  const [rocket, setRocket] = useState<Rocket>(compositionParams.rocket);

  const hydratedCompositionParams = useMemo(() => {
    if (compositionParams && rocket) {
      return {
        ...compositionParams,
        rocket,
      };
    }

    return compositionParams;
  }, [compositionParams, rocket]);

  return { compositionParams: hydratedCompositionParams, rocket, setRocket };
};

export const UserPage = ({ user }: { user: ProfileStats }) => {
  const { compositionParams, rocket, setRocket } = useCompositionParams(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startPolling, setStartPolling] = useState(false);

  useEffect(() => {
    const root = document.body;
    if (isModalOpen) {
      root.style.overflow = "hidden";
    } else {
      root.style.overflow = "visible";
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (compositionParams) {
      const renderRequest: z.infer<typeof RenderRequest> = {
        inputProps: compositionParams,
        username: user.username,
      };

      fetch("/api/render", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(renderRequest),
      })
        .then((res) => {
          console.log(res);
          setStartPolling(true);
        })
        .catch((e) => {
          // TODO - could be better
          setStartPolling(true);
          console.log(e);
        });
    }
  }, [compositionParams, user.username]);

  if (compositionParams === null) {
    return <NotFound />;
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: "#000",
      }}
    >
      <div className={styles.background} id="videobackground">
        <VideoPageBackground />
      </div>
      <Navbar />
      <VideoBox
        inputProps={compositionParams}
        startPolling={startPolling}
        rocket={rocket}
        setRocket={setRocket}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
