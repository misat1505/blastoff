import { Rocket } from "@/types/Rocket";
import { createContext, PropsWithChildren, useContext } from "react";

type RocketContextProps = PropsWithChildren & {
  rocket: Rocket;
};

type RocketContextProvidedValues = {
  rocket: Rocket;
};

const RocketContext = createContext<RocketContextProvidedValues | undefined>(
  undefined
);

export const useRocketContext = () => {
  const context = useContext(RocketContext);
  if (context === undefined)
    throw new Error("useRocketContext called outside RocketProvider.");
  return context;
};

const RocketProvider = ({ children, rocket }: RocketContextProps) => {
  return (
    <RocketContext.Provider value={{ rocket }}>
      {children}
    </RocketContext.Provider>
  );
};

export default RocketProvider;
