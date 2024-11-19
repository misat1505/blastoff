import Loading from "../components/Loading";
import { RocketService } from "../services/RocketService";
import { Rocket as RocketType } from "../types/Rocket";
import { queryKeysBuilder } from "../utils/queryKeysBuilder";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const Rocket = () => {
  const params = useParams();

  const rocketId = params.rocketId;

  const isNumberRegex = /^\d+$/;

  if (!rocketId || !isNumberRegex.test(rocketId)) {
    return <div>Invalid rocket ID. Please provide a valid number.</div>;
  }

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
  } = useQuery({
    queryFn: () => RocketService.getRocketById(id),
    queryKey: queryKeysBuilder.rocket(id),
  });

  if (isLoading) return <Loading />;

  if (error) return <div>{JSON.stringify(error)}</div>;

  if (!rocket) return <div>Rocket not found.</div>;

  return <div>{JSON.stringify(rocket)}</div>;
};
