import { Mission } from "../../types/Mission";
import MissionCard from "./MissionCard";

type LaunchFeedProps = {
  missions: Mission[];
};

const LaunchFeed = ({ missions }: LaunchFeedProps) => {
  return (
    <div className="mx-auto my-4 w-1/3 min-w-96">
      {missions.map((mission) => (
        <MissionCard mission={mission} key={mission.id} />
      ))}
    </div>
  );
};

export default LaunchFeed;
