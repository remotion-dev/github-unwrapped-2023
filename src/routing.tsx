import { Link, Outlet, RootRoute, Route, Router } from "@tanstack/react-router";
import Home from "../components/Home";

const Root = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
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

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute]);

// Create the router using your route tree
export const router = new Router({ routeTree });
