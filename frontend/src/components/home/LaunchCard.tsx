import { Link } from "react-router-dom";
import LaunchProvider, { useLaunchContext } from "@/context/LaunchContext";
import { Launch } from "@/types/Launch";
import { formatLaunchDate } from "@/utils/formatLaunchDate";
import Tooltip from "../Tooltip";
import { GOOGLE_MAPS_LOGO_PATH } from "@/constants";
import { buildGoogleMapsURL } from "@/utils/googleMaps";
import { ROUTES } from "@/lib/routes";
import { CgDetailsMore } from "react-icons/cg";
import LaunchCountdown from "../LaunchCountdown";
import StyledLink from "../StyledLink";
import FavouriteLaunchDisplay from "../FavouriteLaunchDisplay";

type LaunchCardProps = {
  launch: Launch;
};

const LaunchCard = ({ launch }: LaunchCardProps) => {
  return (
    <div className="mb-4 h-[calc(350px+14rem)] grid-cols-3 overflow-hidden rounded-sm bg-slate-100/80 transition-all hover:shadow-sm dark:bg-slate-900/80 sm:grid sm:h-[400px]">
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
      className="col-span-1 max-h-56 w-full object-cover sm:h-full sm:max-h-full"
      src={launch.image_url}
      alt={launch.mission_name}
    />
  );
};

const Info = () => {
  const { launch } = useLaunchContext();

  return (
    <div className="col-span-2 flex h-[calc(100%-14rem)] flex-col justify-between p-4 text-center sm:h-full relative">
      <Header />
      <Countdown />
      <Status />
      <Links />
      <div className="absolute right-4 top-4">
        <FavouriteLaunchDisplay launch={launch} />
      </div>
    </div>
  );
};

const Header = () => {
  const { launch } = useLaunchContext();

  return (
    <div>
      <h2 className="text-xl font-extrabold">{launch.mission_name}</h2>
      <p>{launch.rocket.agency.name}</p>
      <LaunchSiteDisplayer />
    </div>
  );
};

const LaunchSiteDisplayer = () => {
  const { launch } = useLaunchContext();

  if (!launch.site)
    return <div className="text-center">Launch site unknown.</div>;

  const launchSiteGoogleMapsURL = buildGoogleMapsURL({
    latitude: launch.site.latitude,
    longitude: launch.site.longitude,
  });

  return (
    <div className="flex items-center justify-center space-x-2">
      <p className="text-sm text-muted-foreground">
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
  );
};

const Countdown = () => {
  const { launch } = useLaunchContext();

  return (
    <div>
      <LaunchCountdown
        date={launch.date}
        className="text-nowrap text-2xl font-semibold sm:text-xl 2xl:text-3xl"
      />
      <div className="text-muted-foreground">
        {formatLaunchDate(launch.date)}
      </div>
    </div>
  );
};

const Status = () => {
  const { launch } = useLaunchContext();

  return (
    <Tooltip content={launch.status_description}>
      <h2 className="text-2xl font-bold">{launch.status_name}</h2>
    </Tooltip>
  );
};

const Links = () => {
  const { launch } = useLaunchContext();

  return (
    <div className="flex items-center justify-around">
      <StyledLink
        to={ROUTES.LAUNCH.$buildPath({ params: { launchId: launch.id } })}
        tooltip="Launch Details"
      >
        <CgDetailsMore />
        <span className="text-sm font-semibold">Read more</span>
      </StyledLink>
    </div>
  );
};

export default LaunchCard;
