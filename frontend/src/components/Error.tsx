import { cn } from "../lib/utils";
import { LOGO_PATH } from "../constants";
import { Button } from "./ui/button";

type ErrorProps = {
  title: string;
  description?: string;
  className?: string;
  handleRefresh?: () => void;
};

const Error = ({
  title,
  description,
  className,
  handleRefresh,
}: ErrorProps) => {
  const onRefresh = () => {
    if (handleRefresh) {
      handleRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center",
        className
      )}
    >
      <img src={LOGO_PATH} alt="App Logo" className="mb-4 h-24 w-24" />
      <h1 className="mb-2 text-3xl font-semibold">{title}</h1>
      {description && (
        <p className="mb-6 text-lg text-gray-600">{description}</p>
      )}
      <Button onClick={onRefresh}>Refresh</Button>
    </div>
  );
};

export default Error;
