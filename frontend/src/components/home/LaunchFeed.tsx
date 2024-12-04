import { Launch } from "../../types/Launch";
import LaunchCard from "./LaunchCard";

type LaunchFeedProps = {
  launches: Launch[];
};

const LaunchFeed = ({ launches }: LaunchFeedProps) => {
  return (
    <div className="mx-auto my-4 w-full max-w-full px-2 sm:w-4/5 md:w-3/5 lg:w-1/3">
      {launches.map((launch, id) => (
        <LaunchCard launch={launch} key={id} />
      ))}
    </div>
  );
};

export default LaunchFeed;
