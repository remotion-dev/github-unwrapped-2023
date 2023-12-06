import { continueRender, delayRender, staticFile } from "remotion";

const MonaSansFace = new FontFace(
  "Mona Sans",
  `url("${staticFile(
    "Mona-Sans.woff2",
  )}") format("woff2 supports variations"), url("${staticFile(
    "Mona-Sans.woff2",
  )}") format("woff2-variations")`,
  {
    weight: "200 900",
    stretch: "75% 125%",
  },
);

const SevenSegmentFace = new FontFace(
  "Seven Segment",
  `url("${staticFile("Seven Segment.ttf")}") format("truetype")`,
);

let injected = false;

export const injectFont = () => {
  if (!injected && typeof document !== "undefined") {
    const handle = delayRender();
    injected = true;
    Promise.all([MonaSansFace.load(), SevenSegmentFace.load()]).then(
      (fonts) => {
        fonts.forEach((f) => {
          document.fonts.add(f);
        });
        continueRender(handle);
      },
    );
  }
};
