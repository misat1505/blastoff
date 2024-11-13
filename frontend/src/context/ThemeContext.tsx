import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextProps = PropsWithChildren & {};

type Theme = "light" | "dark";

type ThemeContextProvidedValues = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProvidedValues | undefined>(
  undefined
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useThemeContext called outside ThemeProvider.");
  return context;
};

const applyThemeClass = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

const getInitialTheme = (): Theme => {
  const savedTheme = window.localStorage.getItem("theme") as Theme | null;
  if (savedTheme) return savedTheme;

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const ThemeProvider = ({ children }: ThemeContextProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const initialTheme = getInitialTheme();
    applyThemeClass(initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    document.body.classList.add("transition-colors");
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      applyThemeClass(newTheme);
      window.localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
