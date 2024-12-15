import { ROUTES } from "../lib/routes";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import ThemeSwitch from "./ThemeSwitch";
import { LOGO_PATH } from "@/constants";
import { Button, buttonVariants } from "./ui/button";
import {
  Sheet,
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
import { useSessionContext } from "../context/SessionContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { AuthService } from "@/services/AuthService";

const Navbar = () => {
  const { user } = useSessionContext();

  return (
    <>
      <header className="fixed z-50 flex h-20 w-full items-center justify-between bg-slate-100 px-4 transition-all dark:bg-slate-900">
        <Logo />
        <div className="flex items-center space-x-4">
          <div>{user ? user.username : ""}</div>
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
      <Link to={ROUTES.HOME.$path()}>
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
  const { isLoggedIn } = useSessionContext();

  return (
    <Sheet>
      <Tooltip content="Settings">
        <SheetTrigger className="hover:cursor-pointer p-1">
          <span>
            <GiHamburgerMenu size={20} />
          </span>
        </SheetTrigger>
      </Tooltip>
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
              <Tooltip
                content={areVisible ? "Disable tooltips" : "Enable tooltips"}
              >
                <span>
                  <Switch
                    checked={areVisible}
                    onClick={() => setAreVisible((prev) => !prev)}
                  />
                </span>
              </Tooltip>
            </SwitchCard>
            <SwitchCard
              title="Theme Preference"
              description="Choose theme for the app."
            >
              <ThemeSwitch />
            </SwitchCard>
          </div>

          {isLoggedIn ? <LogoutDialog /> : <LoginButton />}
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

const LoginButton = () => {
  return (
    <Tooltip content="Login page">
      <Link
        className={buttonVariants({
          variant: "outline",
          className: "w-full",
        })}
        to={ROUTES.LOGIN.$path()}
      >
        Log in to Blastoff
      </Link>
    </Tooltip>
  );
};

const LogoutDialog = () => {
  const { setUser } = useSessionContext();
  const { toast } = useToast();

  const handleLogout = async () => {
    await AuthService.logout();
    setUser(null);
    toast({ title: "Successfully logged out." });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="w-full">
          <Tooltip content="Show logout modal">
            <Button variant="destructive" className="w-full">
              Logout
            </Button>
          </Tooltip>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            Logging out will sign you out of your account. Please confirm if
            you'd like to proceed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Navbar;
