import { useLaunchCountdown } from "../../hooks/useLaunchCountdown";
import { useLaunchContext } from "../../context/LaunchContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useInView } from "react-intersection-observer";
import { cn } from "../../lib/utils";
import LaunchCountdown from "../LaunchCountdown";

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
              theme === "dark" ? "2px 2px 4px black" : "2px 2px 4px white",
          }}
        >
          <h2>{launch.name}</h2>
          <LaunchCountdown
            date={launch.net}
            className="text-2xl font-semibold sm:text-4xl 2xl:text-4xl"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

type LaunchBarProps = {
  isVisible: boolean;
};

const LaunchBar = ({ isVisible }: LaunchBarProps) => {
  const { launch } = useLaunchContext();

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
      <LaunchCountdown date={launch.net} />
    </div>
  );
};

export default LaunchHeader;
