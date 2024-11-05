import { Mission } from "../types/Mission";
import { createContext, PropsWithChildren, useContext } from "react";

type MissionContextProps = PropsWithChildren & {
  mission: Mission;
};

type MissionContextProvidedValues = {
  mission: Mission;
};

const MissionContext = createContext<MissionContextProvidedValues | undefined>(
  undefined
);

export const useMissionContext = () => {
  const context = useContext(MissionContext);
  if (context === undefined)
    throw new Error("useMissionContext called outside MissionProvider.");
  return context;
};

const MissionProvider = ({ children, mission }: MissionContextProps) => {
  return (
    <MissionContext.Provider value={{ mission }}>
      {children}
    </MissionContext.Provider>
  );
};

export default MissionProvider;
