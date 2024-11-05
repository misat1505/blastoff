import { Link } from "react-router-dom";
import MissionProvider, {
  useMissionContext,
} from "../../context/MissionContext";
import { Mission } from "../../types/Mission";
import { FaGooglePlay } from "react-icons/fa";
import { IoRocket } from "react-icons/io5";
import { getMissionStatusType } from "../../utils/getMissionStatusType";
import { cn } from "../../lib/utils";

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
      <Links />
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

  const statusType = getMissionStatusType(mission.status.id);

  const getColor = (): string => {
    if (statusType === "success") return "text-green-500";
    if (statusType === "failure") return "text-red-500";
    return "";
  };

  return (
    <h2
      className={cn("text-2xl font-bold", getColor())}
      title={mission.status.description}
    >
      {mission.status.name}
    </h2>
  );
};

const Links = () => {
  const { mission } = useMissionContext();

  return (
    <div className="flex items-center justify-around">
      <MissionLink
        to={mission.links.live}
        text="Live"
        icon={<FaGooglePlay />}
      />
      <MissionLink to="#" text="Rocket" icon={<IoRocket />} />
    </div>
  );
};

type MissionLinkProps = {
  to: string;
  text: string;
  icon: JSX.Element;
};

const MissionLink = ({ to, text, icon }: MissionLinkProps) => {
  return (
    <Link
      className="flex items-center gap-x-4 rounded-md bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90"
      to={to}
    >
      {icon}
      {text}
    </Link>
  );
};

export default MissionCard;
