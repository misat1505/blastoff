import { Launch, FavouriteLaunch } from "@/types/Launch";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useQuery, useQueryClient } from "react-query";
import Tooltip from "./Tooltip";
import { FavouritesService } from "@/services/FavouritesService";
import { useThemeContext } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";

type FavouriteLaunchDisplayProps = {
  launch: Launch;
};

const FavouriteLaunchDisplay = ({ launch }: FavouriteLaunchDisplayProps) => {
  const { data: agencies, error } = useQuery(
    queryKeysBuilder.favouriteLaunches(),
    FavouritesService.getMyFavouriteLaunches
  );

  if (agencies === undefined || error) return <DisabledStar />;

  const isFavourite = agencies.some((l) => l.launch_id === launch.id);

  if (!isFavourite) return <NotFollowedLaunch launch={launch} />;

  return <FollowedLaunch launch={launch} />;
};

type FollowedLaunchProps = { launch: Launch };

const FollowedLaunch = ({ launch }: FollowedLaunchProps) => {
  const queryClient = useQueryClient();
  const { data: agencies } = useQuery(
    queryKeysBuilder.favouriteLaunches(),
    FavouritesService.getMyFavouriteLaunches
  );
  const favLaunch = agencies!.find((l) => l.launch_id === launch.id)!;
  const { theme } = useThemeContext();
  const { toast } = useToast();

  const handleClick = async () => {
    await FavouritesService.unfollowLaunch(favLaunch.id);
    queryClient.setQueryData<FavouriteLaunch[]>(
      queryKeysBuilder.favouriteLaunches(),
      (prev) => prev!.filter((l) => l.id !== favLaunch.id)
    );
    toast({
      title: `Unsubscribed from ${launch.mission_name}`,
      description: `You will no longer receive email notifications about this launch.`,
    });
  };

  return (
    <Tooltip content={`Unfollow ${launch.mission_name}`}>
      <button onClick={handleClick}>
        <FaStar size={16} color={theme === "light" ? "blue" : "yellow"} />
      </button>
    </Tooltip>
  );
};

type NotFollowedLaunchProps = { launch: Launch };

const NotFollowedLaunch = ({ launch }: NotFollowedLaunchProps) => {
  const queryClient = useQueryClient();
  const { theme } = useThemeContext();
  const { toast } = useToast();

  const handleClick = async () => {
    const newFavLaunch = await FavouritesService.followLaunch(launch.id);
    queryClient.setQueryData<FavouriteLaunch[]>(
      queryKeysBuilder.favouriteLaunches(),
      (prev) => (prev !== undefined ? [...prev, newFavLaunch] : [newFavLaunch])
    );
    toast({
      title: `Subscribed to ${launch.mission_name}`,
      description: `You'll receive email notifications about updates and launch details.`,
    });
  };

  return (
    <Tooltip content={`Follow ${launch.mission_name}`}>
      <button onClick={handleClick}>
        <FaRegStar size={16} color={theme === "light" ? "blue" : "yellow"} />
      </button>
    </Tooltip>
  );
};

const DisabledStar = () => {
  return (
    <Tooltip content="Log in to use this feature.">
      <button disabled className="hover:cursor-not-allowed">
        <FaRegStar size={16} />
      </button>
    </Tooltip>
  );
};

export default FavouriteLaunchDisplay;
