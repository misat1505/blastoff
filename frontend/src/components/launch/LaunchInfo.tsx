import { Link } from "react-router-dom";
import { useLaunchContext } from "../../context/LaunchContext";
import Tooltip from "../Tooltip";
import { ROUTES } from "../../lib/routes";
import { FaPlay, FaRocket } from "react-icons/fa";
import { buildGoogleMapsURL } from "../../utils/googleMaps";
import { GOOGLE_MAPS_LOGO_PATH } from "../../constants";
import { useLaunchCountdown } from "../../hooks/useLaunchCountdown";
import { formatLaunchDate } from "../../utils/formatLaunchDate";
import { getLaunchStatusType } from "../../utils/getLaunchStatusType";
import { cn } from "../../lib/utils";
import LaunchCountdown from "../LaunchCountdown";

const LaunchInfo = () => {
  return (
    <>
      <GeneralLaunchInfo />
      <div className="my-4 flex space-x-4">
        <div className="flex flex-col">
          <div className="flex h-full flex-col space-y-4">
            <div className="flex-grow rounded-md bg-slate-100 p-4 text-center dark:bg-slate-900">
              <RocketPreview />
            </div>

            <div className="rounded-md bg-slate-100 p-4 text-center dark:bg-slate-900">
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
    <div className="my-4 rounded-md bg-slate-100 p-4 text-center dark:bg-slate-900">
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
    <div className="rounded-md bg-slate-100 p-4 dark:bg-slate-900">
      <h2 className="mb-4">
        <span className="font-semibold">{launch.name}</span> is schedule for
        blastoff from {launch.site.name}, {launch.site.country}
      </h2>
      <div className="relative">
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
        <img src="https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/map_images/pad_orbital_launch_mount_a_20210514061342.jpg" />
      </div>
    </div>
  );
};

const RocketPreview = () => {
  const { launch } = useLaunchContext();

  return (
    <div className="flex h-full flex-col justify-between">
      <h2 className="text-nowrap text-lg font-semibold">
        Vehicle for the Flight
      </h2>
      <div>
        <p className="mb-4">{launch.rocket.name}</p>
        <Tooltip content={`${launch.rocket.name} details`}>
          <Link
            className="mx-auto flex w-fit items-center gap-x-4 rounded-sm bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90"
            to={ROUTES.ROCKET.buildPath({
              rocketId: launch.rocket.id.toString(),
            })}
          >
            <FaRocket />
            <span className="font-semibold">Learn more</span>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

const LaunchLinks = () => {
  const { launch } = useLaunchContext();

  return (
    <div>
      <h2 className="mb-8 text-xl font-semibold">Links</h2>
      <Tooltip content="Open video">
        <Link
          target="_blank"
          className="mx-auto flex w-fit items-center gap-x-4 rounded-sm bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90"
          to={launch.links.live}
        >
          <FaPlay />
          <span className="font-semibold">Video</span>
        </Link>
      </Tooltip>
    </div>
  );
};

export default LaunchInfo;
