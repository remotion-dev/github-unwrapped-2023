import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router";
import Home from "../components/Home";
import LoginRedirectPage from "../components/page";
import UserPage from "../components/VideoPage/page";

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

// Create an index route
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginRedirectPage,
});

// Create an index route
export const userRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/$username",
  component: UserPage,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, loginRoute, userRoute]);

// Create the router using your route tree
export const router = new Router({ routeTree });
