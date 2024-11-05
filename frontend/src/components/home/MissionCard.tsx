import { Link } from "react-router-dom";
import MissionProvider, {
  useMissionContext,
} from "../../context/MissionContext";
import { Mission } from "../../types/Mission";

type MissionCardProps = {
  mission: Mission;
};

const MissionCard = ({ mission }: MissionCardProps) => {
  return (
    <div className="grid h-[500px] grid-cols-3 overflow-hidden rounded-md bg-slate-300">
      <MissionProvider mission={mission}>
        <Image />
        <Info />
      </MissionProvider>
    </div>
  );
};

const Image = () => {
  const { mission } = useMissionContext();

  return (
    <img
      className="col-span-1 h-full object-cover"
      src={mission.image}
      alt={mission.name}
    />
  );
};

const Info = () => {
  return (
    <div className="col-span-2 flex h-full flex-col justify-between p-4 text-center">
      <Title />
      <Countdown />
      <Status />
      <Buttons />
    </div>
  );
};

const Title = () => {
  const { mission } = useMissionContext();

  return <h2 className="text-lg font-semibold">{mission.name}</h2>;
};

const Countdown = () => {
  const { mission } = useMissionContext();

  return <div>{mission.net.toISOString()}</div>;
};

const Status = () => {
  const { mission } = useMissionContext();

  return <div>{mission.status.name}</div>;
};

const Buttons = () => {
  const { mission } = useMissionContext();

  return (
    <div className="flex items-center justify-around">
      <Link to={mission.links.live}>Live</Link>
      <Link to="#">Rocket</Link>
    </div>
  );
};

export default MissionCard;
