import React, { useCallback } from "react";
import { staticFile } from "remotion";

export const ShareButton: React.FC = () => {
  const onclick = useCallback(() => {
    fetch(staticFile("output.mp4"))
      .then((v) => {
        alert("got video");
        return v.blob();
      })
      .then((blob) => {
        const file = new File([blob], "output.mp4", { type: "video/mp4" });
        alert("got file");

        return navigator.share({
          files: [file],
          title: "Remotion Video",
          text: "Check out this video I made with Remotion!",
        });
      })
      .catch((err) => {
        alert(Object.keys(navigator) + err.message);
      });
  }, []);

  return (
    <button onClick={onclick} type="button">
      Share
    </button>
  );
};
