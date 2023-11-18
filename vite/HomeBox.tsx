import React, { useState } from "react";
import { GradientBox } from "./GradientBox/GradientBox";

import { HomeBoxBottom } from "./HomeBoxBottom";
import { HomeBoxTop } from "./HomeBoxTop";
import { Octocat } from "./Octocat";

export const HomeBox: React.FC = () => {
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  return (
    <GradientBox
      style={{
        position: "fixed",
        bottom: 220,
        overflow: "visible",
        width: "calc(100% - 50px)",
        maxWidth: 800,
      }}
    >
      <HomeBoxTop />
      <HomeBoxBottom
        setUserNotFound={setUserNotFound}
        userNotFound={userNotFound}
      />
      <Octocat userNotFound={userNotFound} />
    </GradientBox>
  );
};
