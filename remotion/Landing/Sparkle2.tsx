import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Nebula 3"
    viewBox="0 0 1080 1080"
    {...props}
  >
    <path
      d="m540 471.6 5.06 22.24c4.3 18.88 15.34 33.65 29.45 39.4l16.62 6.77-16.62 6.77c-14.11 5.75-25.16 20.52-29.45 39.4L540 608.42l-5.06-22.24c-4.3-18.88-15.34-33.65-29.45-39.4l-16.62-6.77 16.62-6.77c14.11-5.75 25.16-20.52 29.45-39.4L540 471.6Z"
      style={{
        fill: "#fffce2",
      }}
    />
  </svg>
);
export default SvgComponent;
