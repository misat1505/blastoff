import LaunchFeed from "../components/home/MissionFeed";
import Loading from "../components/Loading";
import { useFetchUpcomingLaunches } from "../hooks/useFetchUpcomingLaunches";

const HomePage = () => {
  const { missions, isLoading, error } = useFetchUpcomingLaunches();

  if (isLoading) return <Loading />;

  if (error || !missions) return <div>Error: {JSON.stringify(error)}</div>;

  return <LaunchFeed missions={missions} />;
};

export default HomePage;
