import { useParams, useSearchParams } from "react-router-dom";

const Rocket = () => {
  const params = useParams();

  const rocketId = params.rocketId;

  const isNumberRegex = /^\d+$/;

  if (!rocketId || !isNumberRegex.test(rocketId)) {
    return <div>Invalid rocket ID. Please provide a valid number.</div>;
  }

  return <div>Rocket {rocketId}</div>;
};

export default Rocket;
