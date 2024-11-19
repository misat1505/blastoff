import { ROUTES } from "../lib/routes";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import ThemeSwitch from "./ThemeSwitch";
import { LOGO_PATH } from "../constants";

const Navbar = () => {
  return (
    <>
      <header className="fixed z-50 flex h-20 w-full items-center justify-between bg-slate-100 px-4 transition-all dark:bg-slate-900">
        <Logo />
        <div>
          <ThemeSwitch />
        </div>
      </header>
      <div className="h-20" />
    </>
  );
};

const Logo = () => {
  return (
    <Tooltip content="Home">
      <Link to={ROUTES.HOME.path}>
        <img
          src={LOGO_PATH}
          alt="Blastoff Logo"
          className="h-12 w-12 rounded-full object-cover"
        />
      </Link>
    </Tooltip>
  );
};

export default Navbar;
