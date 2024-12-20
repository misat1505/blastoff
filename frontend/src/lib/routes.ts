import { lazy } from "react";
import { route } from "react-router-typesafe-routes";

const HomePage = lazy(() => import("../pages/Home"));
const RocketPage = lazy(() => import("../pages/Rocket"));
const LaunchPage = lazy(() => import("../pages/Launch"));
const RegisterPage = lazy(() => import("../pages/Register"));
const LoginPage = lazy(() => import("../pages/Login"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));

type Route = {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

export const ROUTES = {
  HOME: route({ path: "" }),
  ROCKET: route({ path: "rockets/:rocketId" }),
  REGISTER: route({ path: "register" }),
  LOGIN: route({ path: "login" }),
  LAUNCH: route({ path: "launches/:launchId" }),
};

export const routes: Route[] = [
  {
    path: ROUTES.HOME.$path(),
    component: HomePage,
  },
  {
    path: ROUTES.ROCKET.$path(),
    component: RocketPage,
  },
  {
    path: ROUTES.LAUNCH.$path(),
    component: LaunchPage,
  },
  {
    path: ROUTES.REGISTER.$path(),
    component: RegisterPage,
  },
  {
    path: ROUTES.LOGIN.$path(),
    component: LoginPage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];
