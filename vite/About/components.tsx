import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export const NavigateBack: React.FC<{
  backLink?: ComponentProps<typeof Link>;
}> = () => {
  return (
    <Link to={"/"}>
      <img
        src="/arrow.svg"
        style={{ width: 32, height: 32, transform: "rotate(180deg)" }}
      />
    </Link>
  );
};
