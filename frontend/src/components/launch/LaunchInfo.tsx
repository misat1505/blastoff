import { Link } from "react-router-dom";
import { useLaunchContext } from "../../context/LaunchContext";
import Tooltip from "../Tooltip";
import { ROUTES } from "../../lib/routes";
import { FaPlay, FaRocket } from "react-icons/fa";
import { buildGoogleMapsURL } from "../../utils/googleMaps";
import { GOOGLE_MAPS_LOGO_PATH } from "../../constants";
import { formatLaunchDate } from "../../utils/formatLaunchDate";
import { getLaunchStatusType } from "../../utils/getLaunchStatusType";
import { cn } from "../../lib/utils";
import LaunchCountdown from "../LaunchCountdown";
import StyledLink from "../StyledLink";

const LaunchInfo = () => {
  return (
    <>
      <GeneralLaunchInfo />
      <div className="my-4 sm:flex sm:space-x-4">
        <div className="flex flex-col">
          <div className="flex h-full flex-col space-y-4">
            <div className="rounded-md bg-slate-100 p-4 text-center shadow-md dark:bg-slate-900">
              <RocketPreview />
            </div>

            <div className="flex-grow rounded-md bg-slate-100 p-4 text-center shadow-md dark:bg-slate-900">
              <AgencyPreview />
            </div>

            <div className="rounded-md bg-slate-100 p-4 text-center shadow-md dark:bg-slate-900">
              <LaunchLinks />
            </div>
          </div>
        </div>
        <SiteInfo />
      </div>
    </>
  );
};

const GeneralLaunchInfo = () => {
  const { launch } = useLaunchContext();

  const getStatusColor = (): string => {
    const statusType = getLaunchStatusType(launch.status.id);
    if (statusType === "failure") return "text-red-500";
    if (statusType === "success") return "text-green-500";
    return "";
  };

  return (
    <div className="my-4 rounded-md bg-slate-100 p-4 text-center shadow-md dark:bg-slate-900">
      <h2 className="text-2xl font-semibold">{launch.name}</h2>
      <p className="text-sm">{launch.description}</p>
      <TimeDisplay />
      <div className={cn("mt-8", getStatusColor())}>
        <h2 className="text-xl font-semibold">{launch.status.name}</h2>
        <p className="text-sm">{launch.status.description}</p>
      </div>
    </div>
  );
};

const TimeDisplay = () => {
  const { launch } = useLaunchContext();

  return (
    <div className="mt-8">
      <LaunchCountdown date={launch.net} className="text-xl font-semibold" />
      <div className="text-sm">{formatLaunchDate(launch.net)}</div>
    </div>
  );
};

const SiteInfo = () => {
  const { launch } = useLaunchContext();

  const link = buildGoogleMapsURL({
    latitude: launch.site.latitude,
    longitude: launch.site.longitude,
  });

  return (
    <div className="mt-4 flex flex-col gap-y-4 rounded-md bg-slate-100 p-4 shadow-md dark:bg-slate-900 sm:mt-0">
      <h2>
        <span className="font-semibold">{launch.name}</span> is schedule for
        blastoff from {launch.site.name}, {launch.site.country}
      </h2>
      <div className="relative flex-grow">
        <div className="absolute right-4 top-4">
          <Tooltip content="Open in Google Maps">
            <Link to={link} target="_blank">
              <img
                src={GOOGLE_MAPS_LOGO_PATH}
                alt="Google Maps"
                className="h-8 w-8 rounded-full object-cover"
              />
            </Link>
          </Tooltip>
        </div>
        <img
          src={launch.site.image_map}
          className="h-full rounded-md object-cover shadow-md"
        />
      </div>
    </div>
  );
};

const RocketPreview = () => {
  const { launch } = useLaunchContext();
  const rocketPageLink = ROUTES.ROCKET.buildPath({
    rocketId: launch.rocket.id.toString(),
  });

  return (
    <div className="flex h-full flex-col justify-between">
      <h2 className="mb-4 text-nowrap text-lg font-semibold">Vehicle</h2>
      <StyledLink to={rocketPageLink} tooltip={`${launch.rocket.name} details`}>
        <FaRocket />
        <span className="text-sm font-semibold">{launch.rocket.name}</span>
      </StyledLink>
    </div>
  );
};

const LaunchLinks = () => {
  const { launch } = useLaunchContext();

  return (
    <div>
      <h2 className="mb-8 text-xl font-semibold">Links</h2>
      <StyledLink to={launch.links.live} tooltip="Open video" target="_blank">
        <FaPlay />
        <span className="text-sm font-semibold">Video</span>
      </StyledLink>
    </div>
  );
};

const AgencyPreview = () => {
  const { launch } = useLaunchContext();

  return (
    <div className="flex h-full flex-col items-center justify-between gap-y-4">
      <h2 className="text-xl font-semibold">Manufacturer</h2>
      <img
        src={launch.agency.image_url}
        alt={launch.agency.name}
        className="max-w-48 object-cover"
      />
      <p className="text-sm">
        {launch.agency.name}, {launch.agency.country}
      </p>

      <StyledLink
        to={launch.agency.website}
        tooltip={`${launch.agency.name} website`}
        target="_blank"
      >
        <span className="text-sm font-semibold">Learn more</span>
      </StyledLink>
    </div>
  );
};

export default LaunchInfo;
