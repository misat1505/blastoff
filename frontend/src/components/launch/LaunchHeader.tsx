import { useLaunchCountdown } from "../../hooks/useLaunchCountdown";
import { useLaunchContext } from "../../context/LaunchContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useInView } from "react-intersection-observer";
import { cn } from "../../lib/utils";

const LaunchHeader = () => {
  const { theme } = useThemeContext();
  const { launch } = useLaunchContext();
  const { inView, ref } = useInView({ initialInView: true });

  return (
    <div className="mt-4 w-full">
      <LaunchBar isVisible={!inView} />
      <div className="relative">
        <img
          src={launch.image}
          alt={launch.name}
          className="w-full rounded-sm object-cover shadow-lg"
        />
        <div
          ref={ref}
          className="absolute top-[calc(50%-4rem)] -translate-y-1/2"
        ></div>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap text-center text-2xl font-semibold text-slate-900 dark:text-slate-100"
          style={{
            textShadow:
              theme === "dark"
                ? "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                : "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
          }}
        >
          <h2>{launch.name}</h2>
          <Countdown />
        </div>
      </div>
      <div></div>
    </div>
  );
};

const Countdown = () => {
  const {
    launch: { net },
  } = useLaunchContext();
  const timeLeft = useLaunchCountdown(net);

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
    </div>
  );
};

type LaunchBarProps = {
  isVisible: boolean;
};

const LaunchBar = ({ isVisible }: LaunchBarProps) => {
  const { launch } = useLaunchContext();
  const timeLeft = useLaunchCountdown(launch.net);

  function formatTimeUnit(unit: number) {
    return unit.toString().padStart(2, "0");
  }

  const timeText = `NET - ${formatTimeUnit(timeLeft.days)} : ${formatTimeUnit(timeLeft.hours)}
        : ${formatTimeUnit(timeLeft.minutes)} :
        ${formatTimeUnit(timeLeft.seconds)}`;

  return (
    <div
      className={cn(
        "fixed top-0 z-40 flex w-1/2 items-center justify-between bg-slate-200 p-4 text-xl font-semibold transition-all ease-in-out dark:bg-slate-800",
        {
          "top-20": isVisible,
        }
      )}
    >
      <p>{launch.name}</p>
      <p>{timeText}</p>
    </div>
  );
};

export default LaunchHeader;
