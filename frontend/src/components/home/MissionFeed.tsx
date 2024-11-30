import { Mission } from "../../types/Mission";
import MissionCard from "./MissionCard";

type LaunchFeedProps = {
  missions: Mission[];
};

const LaunchFeed = ({ missions }: LaunchFeedProps) => {
  return (
    <div className="mx-auto my-4 w-full max-w-full px-2 sm:w-4/5 md:w-3/5 lg:w-1/3">
      {missions.map((mission, id) => (
        <MissionCard mission={mission} key={id} />
      ))}
    </div>
  );
};

export default LaunchFeed;
