import { useEffect, useMemo, useState } from "react";
import type { Rocket } from "../../src/config";
import type { ProfileStats } from "../../src/server/db";
import { Navbar } from "../Home/Navbar";
import { NotFound } from "../NotFound/NotFound";
import { useUserVideo } from "../context";
import { VideoPageBackground } from "./Background";
import { VideoBox } from "./VideoBox";
import styles from "./styles.module.css";
import { computeCompositionParameters } from "./utils";
declare global {
  interface Window {
    __USER__: ProfileStats | null;
  }
}

export const useCompositionParams = (user: ProfileStats) => {
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

  return { compositionParams: hydratedCompositionParams, setRocket };
};

export const UserPage = () => {
  // const { compositionParams, setRocket } = useCompositionParams(user);
  const { compositionParams, setRocket } = useUserVideo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const root = document.body;
    if (isModalOpen) {
      root.style.overflow = "hidden";
    } else {
      root.style.overflow = "visible";
    }
  }, [isModalOpen]);

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
        rocket={compositionParams.rocket}
        setRocket={setRocket}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
