import { Switch } from "./ui/theme-switch";
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import Tooltip from "./Tooltip";
import { useThemeContext, Theme } from "../context/ThemeContext";

type ThemeIconProps = {
  theme: Theme;
};

const ThemeIcon = ({ theme }: ThemeIconProps) => {
  return theme === "light" ? (
    <MdSunny className="text-white" />
  ) : (
    <IoMoon className="text-black" />
  );
};

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useThemeContext();
  const isDarkMode = theme === "dark";
  const tooltipText = `Switch to ${isDarkMode ? "light" : "dark"} mode`;

  return (
    <Tooltip content={tooltipText}>
      <span>
        <Switch onClick={toggleTheme} checked={isDarkMode}>
          <div className="flex h-full w-full items-center justify-center">
            <ThemeIcon theme={theme} />
          </div>
        </Switch>
      </span>
    </Tooltip>
  );
};

export default ThemeSwitch;
