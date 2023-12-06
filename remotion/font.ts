import { continueRender, delayRender, staticFile } from "remotion";

const style = `
@font-face {
    font-family: "Mona Sans";
    src: url("${staticFile(
      "Mona-Sans.woff2",
    )}") format("woff2 supports variations"),
        url("${staticFile("Mona-Sans.woff2")}") format("woff2-variations");
    font-weight: 200 900;
    font-stretch: 75% 125%;
}

@font-face {
  font-family: "Seven Segment";
  src: url("${staticFile("Seven Segment.ttf")}") format("ttf");
}
`.trim();

let injected = false;

export const injectFont = () => {
  if (!injected && typeof document !== "undefined") {
    const handle = delayRender();
    const styleTag = document.createElement("style");
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);
    injected = true;
    continueRender(handle);
  }
};
