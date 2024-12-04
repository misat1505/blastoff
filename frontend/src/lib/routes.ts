import { lazy } from "react";
import { route } from "react-router-typesafe-routes/dom";

const HomePage = lazy(() => import("../pages/Home"));
const RocketPage = lazy(() => import("../pages/Rocket"));
const RegisterPage = lazy(() => import("../pages/Register"));
const LoginPage = lazy(() => import("../pages/Login"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));

type Route = {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

export const ROUTES = {
  HOME: route(""),
  ROCKET: route("rockets/:rocketId"),
  REGISTER: route("register"),
  LOGIN: route("login"),
};

export const routes: Route[] = [
  {
    path: ROUTES.HOME.path,
    component: HomePage,
  },
  {
    path: ROUTES.ROCKET.path,
    component: RocketPage,
  },
  {
    path: ROUTES.REGISTER.path,
    component: RegisterPage,
  },
  {
    path: ROUTES.LOGIN.path,
    component: LoginPage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];
