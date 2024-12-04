import { LaunchService } from "../services/LaunchService";
import NotFound from "../components/NotFound";
import { Launch } from "../types/Launch";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { queryKeysBuilder } from "../utils/queryKeysBuilder";
import Loading from "../components/Loading";
import Error from "../components/Error";

const LaunchPage = () => {
  const { launchId } = useParams();

  if (!launchId)
    return (
      <NotFound
        title="Launch not found"
        text="Launch id has to be provided. Check your URL."
      />
    );

  return <LaunchPageContent id={launchId} />;
};

export default LaunchPage;

type LaunchPageContentProps = {
  id: Launch["id"];
};

const LaunchPageContent = ({ id }: LaunchPageContentProps) => {
  const {
    data: launch,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryFn: () => LaunchService.getLaunchById(id),
    queryKey: queryKeysBuilder.launch(id),
  });

  if (isLoading) return <Loading />;

  if (error)
    return (
      <Error
        title="Error fetching launch"
        description={JSON.stringify(error)}
        handleRefresh={refetch}
      />
    );

  if (!launch)
    return (
      <NotFound
        title="Launch not found"
        text="Launch of given ID doesn't exist."
      />
    );

  return <div>{JSON.stringify(launch)}</div>;
};
