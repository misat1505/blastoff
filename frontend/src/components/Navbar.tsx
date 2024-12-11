import { ROUTES } from "../lib/routes";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import ThemeSwitch from "./ThemeSwitch";
import { LOGO_PATH } from "../constants";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { Switch } from "./ui/switch";

const Navbar = () => {
  return (
    <>
      <header className="fixed z-50 flex h-20 w-full items-center justify-between bg-slate-100 px-4 transition-all dark:bg-slate-900">
        <Logo />
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <SettingsSheet />
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

const SettingsSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="hover:cursor-pointer">
        <span>
          <Tooltip content="Settings">
            <span>
              <GiHamburgerMenu size={20} />
            </span>
          </Tooltip>
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Make changes to your settings here.
          </SheetDescription>
        </SheetHeader>
        <div className="mb-4 flex h-[calc(100%-2rem)] w-full flex-col items-center justify-between py-4">
          <div>
            <div className="mb-4 flex w-full items-center justify-between space-x-2 rounded-sm border p-4">
              <div>
                <h3 className="font-semibold">
                  Prefers Simplified Launch Countdown Format
                </h3>
                <p className="mt-2 text-sm">
                  Choose how the rocket launch countdown is displayed. If turned
                  on launch countdown will not include days.
                </p>
              </div>
              <Switch />
            </div>

            <div className="mb-4 flex w-full items-center justify-between space-x-2 rounded-sm border p-4">
              <div>
                <h3 className="font-semibold">Prefers Tooltips</h3>
                <p className="mt-2 text-sm">
                  Choose whether tooltips are displayed.
                </p>
              </div>
              <Switch />
            </div>
          </div>
          <Button type="submit">Save changes</Button>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
