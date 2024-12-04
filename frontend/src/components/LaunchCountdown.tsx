import { useLaunchCountdown } from "../hooks/useLaunchCountdown";
import { cn } from "../lib/utils";

type LaunchCountdownProps = React.HTMLAttributes<HTMLDivElement> & {
  date: Date;
};

const LaunchCountdown = ({
  date,
  className,
  ...rest
}: LaunchCountdownProps) => {
  const timeLeft = useLaunchCountdown(date);

  function formatTimeUnit(unit: number) {
    return unit.toString().padStart(2, "0");
  }

  const timeText = `NET - ${formatTimeUnit(timeLeft.days)} : ${formatTimeUnit(timeLeft.hours)}
        : ${formatTimeUnit(timeLeft.minutes)} :
        ${formatTimeUnit(timeLeft.seconds)}`;

  return (
    <div className={cn("text-nowrap", className)} {...rest}>
      {timeText}
    </div>
  );
};

export default LaunchCountdown;
