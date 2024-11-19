import { Link } from "react-router-dom";
import { SATTELITES_IMAGES } from "../../constants";
import { useRocketContext } from "../../context/RocketContext";
import Tooltip from "../Tooltip";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const RocketCapacity = () => {
  const { rocket } = useRocketContext();
  const capacities: RocketCapacityCardProps[] = [
    {
      name: "Low Earth Orbit",
      wiki: "https://en.wikipedia.org/wiki/Low_Earth_orbit",
      capacity: rocket.capacity.leo_capacity,
      image: {
        url: SATTELITES_IMAGES.HUBBLE,
        description: "Hubble Space Telescope",
      },
    },
    {
      name: "Geostationary Earth Orbit",
      wiki: "https://en.wikipedia.org/wiki/Geostationary_orbit",
      capacity: rocket.capacity.gto_capacity,
      image: {
        url: SATTELITES_IMAGES.WHEATHER,
        description: "GOES-16 Weather Satellite",
      },
    },
    {
      name: "Direct Geostationary",
      wiki: "https://en.wikipedia.org/wiki/Geostationary_orbit",
      capacity: rocket.capacity.geo_capacity,
      image: {
        url: SATTELITES_IMAGES.TV,
        description: "DirecTV Satellite",
      },
    },
    {
      name: "Sun-Synchronous",
      wiki: "https://en.wikipedia.org/wiki/Sun-synchronous_orbit",
      capacity: rocket.capacity.sso_capacity,
      image: {
        url: SATTELITES_IMAGES.LANDSAT,
        description: "Landsat 8",
      },
    },
  ];

  const landings = rocket.landings.attempted_landings;

  const isReusable = landings && landings > 0;

  return (
    <section className="w-full bg-slate-300 py-8 dark:bg-slate-700">
      <h2 className="mb-8 text-center text-4xl font-semibold">
        Payload Capacity (kg)
      </h2>
      <div className="mx-auto grid w-full grid-cols-1 gap-x-12 gap-y-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {capacities.map((item, idx) => (
          <RocketCapacityCard key={idx} {...item} />
        ))}
      </div>
      {isReusable ? <ReusabilityNote /> : null}
    </section>
  );
};

export default RocketCapacity;

type RocketCapacityCardProps = {
  name: string;
  wiki: string;
  capacity: number | null;
  image: {
    url: string;
    description: string;
  };
};

const RocketCapacityCard = ({
  name,
  wiki,
  capacity,
  image,
}: RocketCapacityCardProps) => {
  return (
    <div className="text-center">
      <div className="flex items-start justify-center gap-x-4">
        <Tooltip content={image.description}>
          <img
            src={image.url}
            alt={image.description}
            className="h-12 w-12 rounded-full object-cover"
          />
        </Tooltip>
        <Tooltip content="Learn more">
          <Link
            to={wiki}
            target="_blank"
            className="text-2xl font-semibold underline"
          >
            {name}
          </Link>
        </Tooltip>
      </div>
      <RocketCapacityDisplayer capacity={capacity} />
    </div>
  );
};

type RocketCapacityDisplayerProps = {
  capacity: number | null;
};

const RocketCapacityDisplayer = ({
  capacity,
}: RocketCapacityDisplayerProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const component =
    capacity && inView ? (
      <CountUp end={capacity} duration={1.5} separator="," />
    ) : (
      "N/A"
    );

  return (
    <p className="my-8 text-4xl font-bold" ref={ref}>
      {component}
    </p>
  );
};

const ReusabilityNote = () => {
  return (
    <div className="mt-8 text-center">
      <span className="font-semibold">Note:</span> These values represent
      vehicle capacity in its reusable mode.
    </div>
  );
};
