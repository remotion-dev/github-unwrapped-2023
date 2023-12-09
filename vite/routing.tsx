import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router";
import { accentColorValues } from "../src/config.js";
import About from "./About/About.jsx";
import Home from "./Home.jsx";
import { SharePage } from "./Share/page.jsx";
import { UserPage } from "./VideoPage/user-page.jsx";
import { UserVideoContextProvider } from "./context.jsx";

// const TanStackRouterDevtools =
//   process.env.NODE_ENV === "production"
//     ? () => null // Render nothing in production
//     : React.lazy(() =>
//         // Lazy load in development
//         import("@tanstack/router-devtools").then((res) => ({
//           default: res.TanStackRouterDevtools,
//           // For Embedded Mode
//           // default: res.TanStackRouterDevtoolsPanel
//         })),
//       );

const rootRoute = new RootRoute({
  component: () => (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});

/**
 * INDEX ROUTE
 */
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

/**
 * USER ROUTES
 */

export const userRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "$username",
  component: () => (
    <UserVideoContextProvider>
      <Outlet />
    </UserVideoContextProvider>
  ),
});

export const videoRoute = new Route({
  getParentRoute: () => userRoute,
  path: "/",
  component: UserPage,
});

export const shareRoute = new Route({
  getParentRoute: () => userRoute,
  path: "share",
  component: SharePage,
  validateSearch: (search: {
    accentColor?: (typeof accentColorValues)[number];
    platform?: "twitter" | "linkedin";
  }) => {
    // validate and parse the search params into a typed state
    return {
      accentColor: search?.accentColor ?? accentColorValues[0],
      platform: search?.platform,
    };
  },
});

/**
 * ABOUT ROUTE
 */

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  userRoute.addChildren([videoRoute, shareRoute]),
]);

// Create the router using your route tree
export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
