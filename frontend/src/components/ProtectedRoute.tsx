import { useSessionContext } from "@/context/SessionContext";
import { PropsWithChildren, useEffect } from "react";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/lib/routes";
import { useToast } from "@/hooks/use-toast";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading, isLoggedIn } = useSessionContext();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      toast({
        variant: "destructive",
        title: "Have to be logged in to use this feature.",
      });
    }
  }, [isLoggedIn, isLoading, toast]);

  if (isLoading) return <Loading />;

  if (!isLoggedIn) return <Navigate to={ROUTES.HOME.$path()} />;

  return children;
};

export default ProtectedRoute;
