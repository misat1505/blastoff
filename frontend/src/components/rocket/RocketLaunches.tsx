import { useRocketContext } from "@/context/RocketContext";
import CountUp from "react-countup";
import { FaCheck, FaDollarSign } from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useInView } from "react-intersection-observer";

const RocketLaunches = () => {
  const { rocket } = useRocketContext();

  const iconSize = 50;

  const items = [
    {
      icon: <FaDollarSign size={iconSize} />,
      title: "Cost ($)",
      value: rocket.launch_cost,
    },
    {
      icon: <IoMdRocket size={iconSize} />,
      title: "Flights",
      value: rocket.launches_count,
    },
    {
      icon: <FaCheck size={iconSize} className="text-green-500" />,
      title: "Successes",
      value: rocket.successful_launches_count,
    },
    {
      icon: <RxCross2 size={iconSize} className="text-red-500" />,
      title: "Failures",
      value: rocket.failed_launches_count,
    },
    {
      icon: <MdOutlinePendingActions size={iconSize} />,
      title: "Pending",
      value: rocket.pending_launches,
    },
  ];

  return (
    <section className="w-full bg-light_secondary py-8 dark:bg-dark_secondary">
      <h2 className="mb-6 text-center text-4xl font-semibold">Launches</h2>
      <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item, idx) => (
          <RocketLaunchCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
};

export default RocketLaunches;

type RocketLaunchCardProps = {
  icon: JSX.Element;
  title: string;
  value: number | null;
};

const RocketLaunchCard = ({ icon, title, value }: RocketLaunchCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const getComponent = () => {
    if (value !== null && inView) return <CountUp end={value} duration={1.5} />;
    if (value !== null) return "";
    return <p className="text-muted-foreground">N/A</p>;
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
