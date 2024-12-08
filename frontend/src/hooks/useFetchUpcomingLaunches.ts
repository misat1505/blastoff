import { Mission } from "@/types/Mission";
import { MissionService } from "../services/MissionService";
import { queryKeysBuilder } from "../utils/queryKeysBuilder";
import { useQuery } from "react-query";

type useFetchUpcomingLaunchesValue = {
  missions: Mission[] | undefined;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
};

export function useFetchUpcomingLaunches(): useFetchUpcomingLaunchesValue {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeysBuilder.upcomingLaunches(),
    queryFn: MissionService.getUpcomingMissions,
  });

  return {
    missions: data,
    isLoading,
    error,
    refetch,
  };
}
