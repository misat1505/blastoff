import Error from "../components/Error";
import LaunchFeed from "../components/home/MissionFeed";
import Loading from "../components/Loading";
import { useFetchUpcomingLaunches } from "../hooks/useFetchUpcomingLaunches";

const HomePage = () => {
  const { missions, isLoading, error, refetch } = useFetchUpcomingLaunches();

  if (isLoading) return <Loading />;

  if (error || !missions)
    return (
      <Error
        title="Error fetching upcoming launches"
        description={JSON.stringify(error)}
        handleRefresh={refetch}
      />
    );

  return <LaunchFeed missions={missions} />;
};

export default HomePage;
