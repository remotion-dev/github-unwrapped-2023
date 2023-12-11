import { RouterProvider } from "@tanstack/react-router";
import { NotFound } from "./NotFound/NotFound";
import { router } from "./routing";

export const App: React.FC = () => {
  if (typeof window.__INTERNAL_ERROR__ !== "undefined") {
    return <NotFound code="500" />;
  }

  if (window.__USER__ === "not-found") {
    return <NotFound code="404" />;
  }

  return <RouterProvider router={router} />;
};
