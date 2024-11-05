import MissionProvider from "../../context/MissionContext";
import { Mission } from "../../types/Mission";
import MissionCard from "./MissionCard";

type LaunchFeedProps = {
  missions: Mission[];
};

const LaunchFeed = ({ missions }: LaunchFeedProps) => {
  return (
    <div>
      {missions.map((mission) => (
        <MissionProvider mission={mission} key={mission.id}>
          <MissionCard />
        </MissionProvider>
      ))}
    </div>
  );
};

export default LaunchFeed;
