import Loading from "../components/Loading";
import { useFetchUpcomingLaunches } from "../hooks/useFetchUpcomingLaunches";

const HomePage = () => {
  const { missions, isLoading, error } = useFetchUpcomingLaunches();

  if (isLoading) return <Loading />;

  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return <div>{JSON.stringify(missions)}</div>;
};

export default HomePage;
