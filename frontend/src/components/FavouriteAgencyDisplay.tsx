import { useThemeContext } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { FavouritesService } from "@/services/FavouritesService";
import { Agency, FavouriteAgency } from "@/types/Agency";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaRegStar, FaStar } from "react-icons/fa";
import Tooltip from "./Tooltip";

type FavouriteAgencyDisplayProps = {
  agency: Agency;
};

const FavouriteAgencyDisplay = ({ agency }: FavouriteAgencyDisplayProps) => {
  const { data: agencies, error } = useQuery({
    queryKey: queryKeysBuilder.favouriteAgencies(),
    queryFn: FavouritesService.getMyFavouriteAgencies,
  });

  if (agencies === undefined || error) return <DisabledStar />;

  const isFavourite = agencies.some((a) => a.agency_id === agency.id);

  if (!isFavourite) return <NotFollowedAgency agency={agency} />;

  return <FollowedAgency agency={agency} />;
};

type FollowedAgencyProps = { agency: Agency };

const FollowedAgency = ({ agency }: FollowedAgencyProps) => {
  const queryClient = useQueryClient();
  const { data: agencies } = useQuery({
    queryKey: queryKeysBuilder.favouriteAgencies(),
    queryFn: FavouritesService.getMyFavouriteAgencies,
  });
  const favAgency = agencies!.find((a) => a.agency_id === agency.id)!;
  const { theme } = useThemeContext();
  const { toast } = useToast();

  const handleClick = async () => {
    await FavouritesService.unfollowAgency(favAgency.id);
    queryClient.setQueryData<FavouriteAgency[]>(
      queryKeysBuilder.favouriteAgencies(),
      (prev) => prev!.filter((a) => a.id !== favAgency.id)
    );
    toast({
      title: `Unfollowed ${agency.name}`,
      description: `You will no longer receive notifications about their launches.`,
    });
  };

  return (
    <Tooltip content={`Unfollow ${agency.name}`}>
      <button onClick={handleClick}>
        <FaStar color={theme === "light" ? "blue" : "yellow"} />
      </button>
    </Tooltip>
  );
};

type NotFollowedAgencyProps = { agency: Agency };

const NotFollowedAgency = ({ agency }: NotFollowedAgencyProps) => {
  const queryClient = useQueryClient();
  const { theme } = useThemeContext();
  const { toast } = useToast();

  const handleClick = async () => {
    const newFavAgency = await FavouritesService.followAgency(agency.id);
    queryClient.setQueryData<FavouriteAgency[]>(
      queryKeysBuilder.favouriteAgencies(),
      (prev) => (prev !== undefined ? [...prev, newFavAgency] : [newFavAgency])
    );
    toast({
      title: `Followed ${agency.name}`,
      description: `You will now receive email notifications about their upcoming launches.`,
    });
  };

  return (
    <Tooltip content={`Follow ${agency.name}`}>
      <button onClick={handleClick}>
        <FaRegStar color={theme === "light" ? "blue" : "yellow"} />
      </button>
    </Tooltip>
  );
};

const DisabledStar = () => {
  return (
    <Tooltip content="Log in to use this feature.">
      <button disabled className="hover:cursor-not-allowed">
        <FaRegStar />
      </button>
    </Tooltip>
  );
};

export default FavouriteAgencyDisplay;
