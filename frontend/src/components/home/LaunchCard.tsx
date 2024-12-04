import { Link } from "react-router-dom";
import LaunchProvider, { useLaunchContext } from "../../context/LaunchContext";
import { Launch } from "../../types/Launch";
import { cn } from "../../lib/utils";
import { formatLaunchDate } from "../../utils/formatLaunchDate";
import Tooltip from "../Tooltip";
import { GOOGLE_MAPS_LOGO_PATH } from "../../constants";
import { buildGoogleMapsURL } from "../../utils/googleMaps";
import { ROUTES } from "../../lib/routes";
import { getLaunchStatusType } from "../../utils/getLaunchStatusType";
import { CgDetailsMore } from "react-icons/cg";
import { useLaunchCountdown } from "../../hooks/useLaunchCountdown";

type LaunchCardProps = {
  launch: Launch;
};

const LaunchCard = ({ launch }: LaunchCardProps) => {
  return (
    <div className="mb-8 h-[calc(500px+10rem)] grid-cols-3 overflow-hidden rounded-sm bg-slate-300 transition-all hover:shadow-sm dark:bg-slate-700 sm:grid sm:h-[500px]">
      <LaunchProvider launch={launch}>
        <Image />
        <Info />
      </LaunchProvider>
    </div>
  );
};

const Image = () => {
  const { launch } = useLaunchContext();

  return (
    <img
      className="col-span-1 max-h-40 w-full object-cover sm:h-full sm:max-h-full"
      src={launch.image}
      alt={launch.name}
    />
  );
};

const Info = () => {
  return (
    <div className="col-span-2 flex h-[calc(100%-10rem)] flex-col justify-between p-4 text-center sm:h-full">
      <Header />
      <Countdown />
      <Status />
      <Links />
    </div>
  );
};

const Header = () => {
  const { launch } = useLaunchContext();

  const launchSiteGoogleMapsURL = buildGoogleMapsURL({
    latitude: launch.site.latitude,
    longitude: launch.site.longitude,
  });

  return (
    <div>
      <h2 className="text-xl font-extrabold">{launch.name}</h2>
      <p>{launch.agency.name}</p>
      <div className="flex items-center justify-center space-x-2">
        <p>
          {launch.site.name}, {launch.site.country}
        </p>
        <Tooltip content="Open Launch Site in Google Maps">
          <Link to={launchSiteGoogleMapsURL} target="_blank">
            <img
              src={GOOGLE_MAPS_LOGO_PATH}
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
  const { launch } = useLaunchContext();
  const timeLeft = useLaunchCountdown(launch.net);

  function formatTimeUnit(unit: number) {
    return unit.toString().padStart(2, "0");
  }

  return (
    <div>
      <div className="text-nowrap text-2xl font-semibold sm:text-4xl 2xl:text-4xl">
        NET - {formatTimeUnit(timeLeft.days)} : {formatTimeUnit(timeLeft.hours)}{" "}
        : {formatTimeUnit(timeLeft.minutes)} :{" "}
        {formatTimeUnit(timeLeft.seconds)}
      </div>
      <div>{formatLaunchDate(launch.net)}</div>
    </div>
  );
};

const Status = () => {
  const { launch } = useLaunchContext();

  const statusType = getLaunchStatusType(launch.status.id);

  const getColor = (): string => {
    if (statusType === "success") return "text-green-500";
    if (statusType === "failure") return "text-red-500";
    return "";
  };

  return (
    <Tooltip content={launch.status.description}>
      <h2 className={cn("text-2xl font-bold", getColor())}>
        {launch.status.name}
      </h2>
    </Tooltip>
  );
};

const Links = () => {
  const { launch } = useLaunchContext();

  return (
    <div className="flex items-center justify-around">
      <LaunchLink
        to={ROUTES.LAUNCH.buildPath({ launchId: launch.id })}
        text="Read more"
        icon={<CgDetailsMore />}
        tooltipText="Launch Details"
      />
    </div>
  );
};

type LaunchLinkProps = {
  to: string;
  text: string;
  icon: JSX.Element;
  tooltipText: string;
};

const LaunchLink = ({ to, text, icon, tooltipText }: LaunchLinkProps) => {
  return (
    <Tooltip content={tooltipText}>
      <Link
        className="flex items-center gap-x-4 rounded-sm bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90"
        to={to}
      >
        {icon}
        <span className="font-semibold">{text}</span>
      </Link>
    </Tooltip>
  );
};

export default LaunchCard;
