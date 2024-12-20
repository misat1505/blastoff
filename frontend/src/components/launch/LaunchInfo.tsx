import { Link } from "react-router-dom";
import { useLaunchContext } from "@/context/LaunchContext";
import Tooltip from "../Tooltip";
import { ROUTES } from "@/lib/routes";
import { FaPlay, FaRocket } from "react-icons/fa";
import { buildGoogleMapsURL } from "@/utils/googleMaps";
import { GOOGLE_MAPS_LOGO_PATH, LOGO_PATH } from "@/constants";
import { formatLaunchDate } from "@/utils/formatLaunchDate";
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

  return (
    <div className="my-4 rounded-md bg-slate-100 p-4 text-center shadow-md dark:bg-slate-900">
      <h2 className="text-2xl font-semibold">{launch.name}</h2>
      <p className="text-sm text-muted-foreground">{launch.description}</p>
      <TimeDisplay />
      <div className="mt-8">
        <h2 className="text-xl font-semibold">{launch.status_name}</h2>
        <p className="text-sm text-muted-foreground">
          {launch.status_description}
        </p>
      </div>
    </div>
  );
};

const TimeDisplay = () => {
  const { launch } = useLaunchContext();

  return (
    <div className="mt-8">
      <LaunchCountdown date={launch.date} className="text-xl font-semibold" />
      <div className="text-sm text-muted-foreground">
        {formatLaunchDate(launch.date)}
      </div>
    </div>
  );
};

const SiteInfo = () => {
  const { launch } = useLaunchContext();

  if (!launch.site)
    return (
      <div className="mt-4 flex flex-grow flex-col items-center justify-center gap-y-4 rounded-md bg-slate-100 p-4 shadow-md dark:bg-slate-900 sm:mt-0">
        <img
          src={LOGO_PATH}
          alt="logo"
          className="h-36 w-36 rounded-full object-cover"
        />
        <h2 className="text-xl font-semibold">Launch site unknown.</h2>
      </div>
    );

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
          src={launch.site.map_image_url || undefined}
          className="h-full rounded-md object-cover shadow-md"
        />
      </div>
    </div>
  );
};

const RocketPreview = () => {
  const { launch } = useLaunchContext();
  const rocketPageLink = ROUTES.ROCKET.$buildPath({
    params: { rocketId: launch.rocket.id.toString() },
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
      {launch.url ? (
        <StyledLink to={launch.url} tooltip="Open video" target="_blank">
          <FaPlay />
          <span className="text-sm font-semibold">Video</span>
        </StyledLink>
      ) : (
        <p className="text-sm text-muted-foreground">No available video.</p>
      )}
    </div>
  );
};

const AgencyPreview = () => {
  const { launch } = useLaunchContext();

  return (
    <Tooltip
      content={
        <p className="max-w-96 text-wrap">{launch.rocket.agency.description}</p>
      }
    >
      <div className="flex h-full flex-col items-center justify-between gap-y-4">
        <h2 className="text-xl font-semibold">Manufacturer</h2>
        <img
          src={launch.rocket.agency.image_url || undefined}
          alt={launch.rocket.agency.name || undefined}
          className="max-w-48 object-cover"
        />
        <p className="text-sm">
          {launch.rocket.agency.name}, {launch.rocket.agency.country}
        </p>

        <StyledLink
          to={launch.rocket.agency.website!}
          tooltip={`${launch.rocket.agency.name} website`}
          target="_blank"
        >
          <span className="text-sm font-semibold">Learn more</span>
        </StyledLink>
      </div>
    </Tooltip>
  );
};

export default LaunchInfo;
