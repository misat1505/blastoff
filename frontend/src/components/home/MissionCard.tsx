import { useMissionContext } from "../../context/MissionContext";

const MissionCard = () => {
  const { mission } = useMissionContext();
  return <div>{JSON.stringify(mission)}</div>;
};

export default MissionCard;
