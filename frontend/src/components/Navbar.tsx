import { ROUTES } from "../lib/routes";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <>
      <header className="fixed flex h-20 w-full items-center justify-between bg-slate-100 px-4 dark:bg-slate-900">
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
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Blastoff Logo"
          className="h-12 w-12 rounded-full object-cover"
        />
      </Link>
    </Tooltip>
  );
};

export default Navbar;
