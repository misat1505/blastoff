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
import Tooltip from "../Tooltip";

type MissionCardProps = {
  mission: Mission;
};

const MissionCard = ({ mission }: MissionCardProps) => {
  return (
    <div className="mb-8 h-[calc(500px+10rem)] grid-cols-3 overflow-hidden rounded-md bg-slate-300 transition-all hover:shadow-lg lg:grid lg:h-[500px]">
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
      className="col-span-1 max-h-40 w-full object-cover lg:h-full lg:max-h-full"
      src={mission.image}
      alt={mission.name}
    />
  );
};

const Info = () => {
  return (
    <div className="col-span-2 flex h-[calc(100%-10rem)] flex-col justify-between p-4 text-center lg:h-full">
      <Header />
      <Countdown />
      <Status />
      <Links />
    </div>
  );
};

const Header = () => {
  const { mission } = useMissionContext();

  return (
    <div>
      <h2 className="text-xl font-extrabold">{mission.name}</h2>
      <p>{mission.agency.name}</p>
      <div className="flex items-center justify-center space-x-2">
        <p>
          {mission.site.name}, {mission.site.country}
        </p>
        <Tooltip content="Open Launch Site in Google Maps">
          <Link
            to={`https://www.google.com/maps?q=${mission.site.latitude},${mission.site.longitude}`}
            target="_blank"
          >
            <img
              src={`${process.env.PUBLIC_URL}/google-maps-logo.png`}
              alt="Google Maps"
              className="h-8 w-8 rounded-full object-cover"
            />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
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
      <div className="text-nowrap text-4xl font-semibold lg:text-2xl 2xl:text-4xl">
        NET - {formatTimeUnit(timeLeft.days)} : {formatTimeUnit(timeLeft.hours)}{" "}
        : {formatTimeUnit(timeLeft.minutes)} :{" "}
        {formatTimeUnit(timeLeft.seconds)}
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
    <Tooltip content={mission.status.description}>
      <h2 className={cn("text-2xl font-bold", getColor())}>
        {mission.status.name}
      </h2>
    </Tooltip>
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
        tooltipText="Watch Live"
      />
      <MissionLink
        to="#"
        text="Rocket"
        icon={<IoRocket />}
        tooltipText="Rocket Details"
      />
    </div>
  );
};

type MissionLinkProps = {
  to: string;
  text: string;
  icon: JSX.Element;
  tooltipText: string;
};

const MissionLink = ({ to, text, icon, tooltipText }: MissionLinkProps) => {
  return (
    <Tooltip content={tooltipText}>
      <Link
        className="flex items-center gap-x-4 rounded-md bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90"
        to={to}
      >
        {icon}
        <span className="font-semibold">{text}</span>
      </Link>
    </Tooltip>
  );
};

export default MissionCard;
