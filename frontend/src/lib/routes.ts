import { lazy } from "react";
import { route } from "react-router-typesafe-routes/dom";

const HomePage = lazy(() => import("../pages/Home"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));

type Route = {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

export const ROUTES = {
  HOME: route(""),
};

export const routes: Route[] = [
  {
    path: ROUTES.HOME.path,
    component: HomePage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];
