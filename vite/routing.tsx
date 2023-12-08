import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router";
import About from "./About/About.jsx";
import Home from "./Home.jsx";
import { SharePage } from "./Share/page.jsx";
import { UserPageOrNotFound } from "./VideoPage/UserPageOrNotFound.jsx";

const Root = () => {
  return <Outlet />;
};

const rootRoute = new RootRoute({
  component: Root,
});

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const $usernamePath = "/$username";

// Create an index route
const userRoute = new Route({
  getParentRoute: () => rootRoute,
  path: $usernamePath,
  component: UserPageOrNotFound,
});

export const userShare = new Route({
  getParentRoute: () => rootRoute,
  path: "/share",
  component: SharePage,
  validateSearch: (search: Record<string, unknown>) => {
    // validate and parse the search params into a typed state
    return {
      platform: search?.platform,
    };
  },
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  userShare,
  userRoute,
]);

// Create the router using your route tree
export const router = new Router({ routeTree });
