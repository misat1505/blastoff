import { useSessionContext } from "@/context/SessionContext";
import { FavouritesService } from "@/services/FavouritesService";
import { FavouriteAgency } from "@/types/Agency";
import { FavouriteLaunch } from "@/types/Launch";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { useQuery } from "@tanstack/react-query";
import { FaBuilding, FaRocket } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";

const FollowedCount = () => {
  return (
    <div className="flex items-stretch space-x-4 mt-4 bg-slate-100 dark:bg-dark_primary p-2 rounded-md overflow-x-auto">
      <FollowedAgenciesCount />
      <FollowedLaunchesCount />
      <UserCreationInfo />
    </div>
  );
};

const FollowedAgenciesCount = () => {
  const { data: agencies, isLoading } = useQuery({
    queryFn: FavouritesService.getMyFavouriteAgencies,
    queryKey: queryKeysBuilder.favouriteAgencies(),
  });

  return (
    <div className="flex items-center flex-grow justify-center space-x-4 bg-light_secondary dark:bg-dark_secondary p-2 rounded-md min-w-[200px]">
      <FaBuilding size={30} />
      <div>
        <h2 className="font-semibold">Followed agencies</h2>
        <div>
          {isLoading ? (
            <Skeleton className="w-48 h-8" />
          ) : (
            <FollowedAgencesCountText agencies={agencies!} />
          )}
        </div>
      </div>
    </div>
  );
};

type FollowedAgencesCountTextProps = { agencies: FavouriteAgency[] };

const FollowedAgencesCountText = ({
  agencies,
}: FollowedAgencesCountTextProps) => {
  const todayFollows = agencies.filter((agency) => {
    const agencyDate = new Date(agency.added_at);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    agencyDate.setHours(0, 0, 0, 0);

    return agencyDate.getTime() === today.getTime();
  }).length;

  return (
    <div className="flex items-center space-x-2">
      <div className="font-semibold text-lg">{agencies.length}</div>
      {todayFollows > 0 && (
        <div className="mt-1 text-sm text-emerald-500">
          +{todayFollows} today
        </div>
      )}
    </div>
  );
};

const FollowedLaunchesCount = () => {
  const { data: launches, isLoading } = useQuery({
    queryFn: FavouritesService.getMyFavouriteLaunches,
    queryKey: queryKeysBuilder.favouriteLaunches(),
  });

  return (
    <div className="flex items-center flex-grow justify-center space-x-4 bg-light_secondary dark:bg-dark_secondary p-2 rounded-md min-w-[200px]">
      <FaRocket size={30} />
      <div>
        <h2 className="font-semibold">Followed launches</h2>
        <div>
          {isLoading ? (
            <Skeleton className="w-48 h-8" />
          ) : (
            <FollowedLaunchesCountText launches={launches!} />
          )}
        </div>
      </div>
    </div>
  );
};

type FollowedLaunchesCountTextProps = { launches: FavouriteLaunch[] };

const FollowedLaunchesCountText = ({
  launches,
}: FollowedLaunchesCountTextProps) => {
  const todayFollows = launches.filter((launch) => {
    const launchDate = new Date(launch.added_at);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    launchDate.setHours(0, 0, 0, 0);

    return launchDate.getTime() === today.getTime();
  }).length;

  return (
    <div className="flex items-center space-x-2">
      <div className="font-semibold text-lg">{launches.length}</div>
      {todayFollows > 0 && (
        <div className="mt-1 text-sm text-emerald-500">
          +{todayFollows} today
        </div>
      )}
    </div>
  );
};

const UserCreationInfo = () => {
  const { user } = useSessionContext();

  const createdDate = new Date(user!.created_at);
  const today = new Date();
  const timeDiff = today.getTime() - createdDate.getTime();
  const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return (
    <div className="text-center flex flex-grow flex-col justify-between bg-light_secondary dark:bg-dark_secondary p-2 rounded-md min-w-[200px]">
      <h2 className="font-semibold">
        Active since {createdDate.toLocaleDateString()}
      </h2>
      <p className="text-sm text-muted-foreground">
        {daysSinceCreation === 0
          ? "You joined today!"
          : `You have been a user for ${daysSinceCreation} day${
              daysSinceCreation > 1 ? "s" : ""
            }.`}
      </p>
    </div>
  );
};

export default FollowedCount;
