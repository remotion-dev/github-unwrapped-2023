import { useEffect, useMemo, useState } from "react";
import type { ProfileStats } from "../../src/config";
import { computeCompositionParameters, type Rocket } from "../../src/config";
import { MobileHeader } from "../About/MobileHeader";
import { NotFound } from "../NotFound/NotFound";
import { useUserVideo } from "../context";
import { VideoPageBackground } from "./Background";
import { VideoBox } from "./VideoBox";
import styles from "./styles.module.css";
declare global {
  interface Window {
    __USER__: ProfileStats | "not-found";
    __INTERNAL_ERROR__?: string;
  }
}

export const useCompositionParams = (user: ProfileStats) => {
  const [rocketPreference, setRocket] = useState<Rocket | null>(null);
  const compositionParams = useMemo(() => {
    return computeCompositionParameters(user, rocketPreference);
  }, [rocketPreference, user]);

  return { compositionParams, setRocket };
};

export const UserPage = () => {
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
    return <NotFound code="404" />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.background} id="videobackground">
        <VideoPageBackground />
      </div>
      <MobileHeader title={""} description={""} />
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
