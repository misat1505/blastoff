import { Link } from "react-router-dom";
import { SATTELITES_IMAGES } from "../../constants";
import { useRocketContext } from "../../context/RocketContext";
import Tooltip from "../Tooltip";
import CountUp from "react-countup";

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

  return (
    <section className="w-full bg-slate-300 py-8 dark:bg-slate-700">
      <h2 className="mb-8 text-center text-4xl font-semibold">
        Payload Capacity (kg)
      </h2>
      <div className="mx-auto grid w-full grid-cols-1 gap-x-12 gap-y-6 px-4 sm:grid-cols-4 lg:px-8">
        {capacities.map((item, idx) => (
          <RocketCapacityCard key={idx} {...item} />
        ))}
      </div>
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
          <Link to={wiki} target="_blank" className="text-2xl font-semibold">
            {name}
          </Link>
        </Tooltip>
      </div>
      <p className="my-8 text-4xl font-bold">
        {capacity ? (
          <CountUp end={capacity} duration={1.5} separator="," />
        ) : (
          "N/A"
        )}
      </p>
    </div>
  );
};
