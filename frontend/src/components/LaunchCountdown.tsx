import { useCountdownFormat } from "../hooks/useCountdownFormat";
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
  const [isSimplified] = useCountdownFormat();
  const timeLeft = useLaunchCountdown(date);

  function formatTimeUnit(unit: number) {
    return unit.toString().padStart(2, "0");
  }

  const getText = (): string => {
    if (isSimplified)
      return `NET - ${formatTimeUnit(timeLeft.days * 24 + timeLeft.hours)}
        : ${formatTimeUnit(timeLeft.minutes)} :
        ${formatTimeUnit(timeLeft.seconds)}`;

    return `NET - ${formatTimeUnit(timeLeft.days)} : ${formatTimeUnit(timeLeft.hours)}
        : ${formatTimeUnit(timeLeft.minutes)} :
        ${formatTimeUnit(timeLeft.seconds)}`;
  };

  return (
    <div className={cn("text-nowrap", className)} {...rest}>
      {getText()}
    </div>
  );
};

export default LaunchCountdown;
