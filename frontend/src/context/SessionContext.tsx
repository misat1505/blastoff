import { AuthService } from "@/services/AuthService";
import { User } from "@/types/User";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext } from "react";

type SessionContextProps = PropsWithChildren & {};

type SessionContextProvidedValues = {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
};

const SessionContext = createContext<SessionContextProvidedValues | undefined>(
  undefined
);

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined)
    throw new Error("useSessionContext called outside SessionProvider.");
  return context;
};

const SessionProvider = ({ children }: SessionContextProps) => {
  const queryClient = useQueryClient();
  const { isLoading } = useQuery({
    queryFn: AuthService.me,
    queryKey: queryKeysBuilder.me(),
  });

  const user = queryClient.getQueryData<User>(queryKeysBuilder.me());
  const setUser = (user: User | null) => {
    queryClient.setQueryData(queryKeysBuilder.me(), user);
  };
  const isLoggedIn = !!user;

  return (
    <SessionContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isLoggedIn,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
