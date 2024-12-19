import { User } from "@/types/User";
import { AuthService } from "@/services/AuthService";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { createContext, PropsWithChildren, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";

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
    queryKey: queryKeysBuilder.me(),
    queryFn: AuthService.me,
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
