import CountUp from "react-countup";
import { useRocketContext } from "../../context/RocketContext";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useInView } from "react-intersection-observer";
import { PiAirplaneLandingFill } from "react-icons/pi";
import { GiCatch } from "react-icons/gi";

const RocketLandings = () => {
  const { rocket } = useRocketContext();

  const iconSize = 50;
  const isCatchable = rocket.id === 464;

  const items = [
    {
      icon: isCatchable ? (
        <GiCatch size={iconSize} />
      ) : (
        <PiAirplaneLandingFill size={iconSize} />
      ),
      title: "Type",
      value: isCatchable ? "Catch" : "Landing",
    },
    {
      icon: <PiAirplaneLandingFill size={iconSize} />,
      title: "Attempts",
      value: rocket.landings.attempted_landings,
    },
    {
      icon: <FaCheck size={iconSize} className="text-green-500" />,
      title: "Successes",
      value: rocket.landings.successful_landings,
    },
    {
      icon: <RxCross2 size={iconSize} className="text-red-500" />,
      title: "Failures",
      value: rocket.landings.failed_landings,
    },
  ];

  return (
    <section className="w-full bg-slate-300 py-8 dark:bg-slate-700">
      <h2 className="mb-6 text-center text-4xl font-semibold">Landings</h2>
      <div className="mx-auto grid w-full grid-cols-2 gap-y-6 sm:w-4/5 sm:grid-cols-4">
        {items.map((item, idx) => (
          <RocketLandingCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
};

export default RocketLandings;

type RocketLaunchCardProps = {
  icon: JSX.Element;
  title: string;
  value: string | number | null;
};

const RocketLandingCard = ({ icon, title, value }: RocketLaunchCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const getComponent = () => {
    if (typeof value === "string") return value;
    if (value && inView) return <CountUp end={value} duration={1.5} />;
    if (value) return "";
    return "N/A";
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-y-4"
      ref={ref}
    >
      {icon}
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="text-4xl font-bold">{getComponent()}</div>
    </div>
  );
};
