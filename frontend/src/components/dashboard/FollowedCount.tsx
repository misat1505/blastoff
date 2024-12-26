import { FavouritesService } from "@/services/FavouritesService";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { useQuery } from "react-query";
import { Skeleton } from "../ui/skeleton";
import { FaBuilding, FaRocket } from "react-icons/fa";
import { FavouriteAgency } from "@/types/Agency";
import { FavouriteLaunch } from "@/types/Launch";
import { useSessionContext } from "@/context/SessionContext";

const FollowedCount = () => {
  return (
    <div className="grid grid-cols-3 space-x-4 mt-4 bg-slate-300/40 dark:bg-slate-700/20 p-2 rounded-md">
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
    <div className="flex items-center justify-center space-x-4 flex-grow bg-slate-300 dark:bg-slate-700 p-2 rounded-md">
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
  const todayFollows = agencies.filter(
    (agency) => new Date(agency.added_at).getTime() < Date.now()
  ).length;

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
    <div className="flex items-center justify-center space-x-4 flex-grow bg-slate-300 dark:bg-slate-700 p-2 rounded-md">
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
  const todayFollows = launches.filter(
    (launch) => new Date(launch.added_at).getTime() < Date.now()
  ).length;

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
    <div className="text-center flex flex-col justify-between bg-slate-300 dark:bg-slate-700 p-2 rounded-md">
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
