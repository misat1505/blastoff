import { ROUTES } from "../lib/routes";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import ThemeSwitch from "./ThemeSwitch";
import { LOGO_PATH } from "../constants";
import { Button, buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { Switch } from "./ui/switch";
import { useCountdownFormat } from "../hooks/useCountdownFormat";
import { useTooltipSwitch } from "../hooks/useTooltipSwitch";
import { PropsWithChildren } from "react";

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
  const [isSimplified, setIsSimplified] = useCountdownFormat();
  const [areVisible, setAreVisible] = useTooltipSwitch();

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
            <SwitchCard
              title="Prefers Simplified Launch Countdown Format"
              description="Choose how the rocket launch countdown is displayed. If turned
                  on launch countdown will not include days."
            >
              <Switch
                checked={isSimplified}
                onClick={() => setIsSimplified((prev) => !prev)}
              />
            </SwitchCard>
            <SwitchCard
              title="Tooltips Preference"
              description="Choose whether tooltips are displayed."
            >
              <Switch
                checked={areVisible}
                onClick={() => setAreVisible((prev) => !prev)}
              />
            </SwitchCard>
            <SwitchCard
              title="Theme Preference"
              description="Choose theme for the app."
            >
              <ThemeSwitch />
            </SwitchCard>
          </div>

          <SheetClose className="w-full">
            <Link
              className={buttonVariants({
                variant: "outline",
                className: "w-full",
              })}
              to={ROUTES.LOGIN.path}
            >
              Log in to Blastoff
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

type SwicthCardProps = PropsWithChildren & {
  title: string;
  description: string;
};

const SwitchCard = ({ children, title, description }: SwicthCardProps) => {
  return (
    <div className="mb-4 flex w-full items-center justify-between space-x-2 rounded-sm border p-4">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default Navbar;
