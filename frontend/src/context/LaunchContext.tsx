import { Launch } from "../types/Launch";
import { createContext, PropsWithChildren, useContext } from "react";

type LaunchContextProps = PropsWithChildren & {
  launch: Launch;
};

type LaunchContextProvidedValues = {
  launch: Launch;
};

const LaunchContext = createContext<LaunchContextProvidedValues | undefined>(
  undefined
);

export const useLaunchContext = () => {
  const context = useContext(LaunchContext);
  if (context === undefined)
    throw new Error("useLaunchContext called outside LaunchProvider.");
  return context;
};

const LaunchProvider = ({ children, launch }: LaunchContextProps) => {
  return (
    <LaunchContext.Provider value={{ launch }}>
      {children}
    </LaunchContext.Provider>
  );
};

export default LaunchProvider;
