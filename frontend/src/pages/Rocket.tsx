import RocketProvider from "@/context/RocketContext";
import Loading from "@/components/Loading";
import { RocketService } from "@/services/RocketService";
import { Rocket as RocketType } from "@/types/Rocket";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import RocketImage from "@/components/rocket/RocketImage";
import RocketManufacture from "@/components/rocket/RocketManufacture";
import RocketCapacity from "@/components/rocket/RocketCapacity";
import RockeLaunches from "@/components/rocket/RocketLaunches";
import RocketLandings from "@/components/rocket/RocketLandings";
import NotFound from "@/components/NotFound";
import Error from "@/components/Error";

const Rocket = () => {
  const params = useParams();

  const rocketId = params.rocketId;

  const isNumberRegex = /^\d+$/;

  if (!rocketId || !isNumberRegex.test(rocketId))
    return (
      <NotFound
        title="Rocket not found"
        text="Invalid rocket ID - not a number. Check your URL."
      />
    );

  return <RocketPageContent id={parseInt(rocketId)} />;
};

export default Rocket;

type RocketPageContentProps = {
  id: RocketType["id"];
};

const RocketPageContent = ({ id }: RocketPageContentProps) => {
  const {
    data: rocket,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryFn: () => RocketService.getRocketById(id),
    queryKey: queryKeysBuilder.rocket(id),
  });

  if (isLoading) return <Loading />;

  if (error)
    return (
      <Error
        title="Error fetching rocket"
        description={JSON.stringify(error)}
        handleRefresh={refetch}
      />
    );

  if (!rocket)
    return (
      <NotFound
        title="Rocket not found"
        text="Rocket of given ID doesn't exist."
      />
    );

  const landings = rocket.landings_count;
  const isReusable = landings ? landings > 0 : false;

  return (
    <div className="overflow-x-hidden">
      <RocketProvider rocket={rocket}>
        <RocketImage />
        <RocketManufacture />
        <RocketCapacity />
        <RockeLaunches />
        {isReusable ? <RocketLandings /> : null}
      </RocketProvider>
    </div>
  );
};
