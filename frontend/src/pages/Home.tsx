import { useQuery } from "react-query";
import Error from "@/components/Error";
import LaunchFeed from "@/components/home/LaunchFeed";
import Loading from "@/components/Loading";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { LaunchService } from "@/services/LaunchService";

const HomePage = () => {
  const {
    data: launches,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeysBuilder.upcomingLaunches(),
    queryFn: LaunchService.getUpcomingLaunches,
  });

  if (isLoading) return <Loading />;

  if (error || !launches)
    return (
      <Error
        title="Error fetching upcoming launches"
        description={JSON.stringify(error)}
        handleRefresh={refetch}
      />
    );

  return <LaunchFeed launches={launches} />;
};

export default HomePage;
