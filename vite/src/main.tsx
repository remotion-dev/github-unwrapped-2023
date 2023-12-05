import { RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { router } from "../routing.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
