import { Link } from "react-router-dom";
import MissionProvider, {
  useMissionContext,
} from "../../context/MissionContext";
import { Mission } from "../../types/Mission";
import { FaGooglePlay } from "react-icons/fa";
import { IoRocket } from "react-icons/io5";
import { getMissionStatusType } from "../../utils/getMissionStatusType";
import { cn } from "../../lib/utils";
import { formatMissionDate } from "../../utils/formatMissionDate";
import { useEffect, useState } from "react";

type MissionCardProps = {
  mission: Mission;
};

const MissionCard = ({ mission }: MissionCardProps) => {
  return (
    <div className="mb-8 grid h-[500px] grid-cols-3 overflow-hidden rounded-md bg-slate-300 transition-all hover:shadow-lg">
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
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(mission.net));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(mission.net));
    }, 1000);

    return () => clearInterval(timerId);
  }, [mission.net]);

  function calculateTimeLeft(targetDate: Date) {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  function formatTimeUnit(unit: number) {
    return unit.toString().padStart(2, "0");
  }

  return (
    <div>
      <div className="text-4xl">
        NET - {formatTimeUnit(timeLeft.days)}:{formatTimeUnit(timeLeft.hours)}:
        {formatTimeUnit(timeLeft.minutes)}:{formatTimeUnit(timeLeft.seconds)}
      </div>
      <div>{formatMissionDate(mission.net)}</div>
    </div>
  );
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
      <span className="font-semibold">{text}</span>
    </Link>
  );
};

export default MissionCard;
