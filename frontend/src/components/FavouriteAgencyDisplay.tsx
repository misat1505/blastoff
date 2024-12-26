import { Agency, FavouriteAgency } from "@/types/Agency";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useQuery, useQueryClient } from "react-query";
import Tooltip from "./Tooltip";
import { FavouritesService } from "@/services/FavouritesService";

type FavouriteAgencyDisplayProps = {
  agency: Agency;
};

const FavouriteAgencyDisplay = ({ agency }: FavouriteAgencyDisplayProps) => {
  const { data: agencies } = useQuery(
    queryKeysBuilder.favouriteAgencies(),
    FavouritesService.getMyFavouriteAgencies
  );

  if (agencies === undefined) return <DisabledStar />;

  const isFavourite = agencies.some((a) => a.agency_id === agency.id);

  if (!isFavourite) return <NotFollowedAgency agency={agency} />;

  return <FollowedAgency agency={agency} />;
};

type FollowedAgencyProps = { agency: Agency };

const FollowedAgency = ({ agency }: FollowedAgencyProps) => {
  const queryClient = useQueryClient();
  const { data: agencies } = useQuery(
    queryKeysBuilder.favouriteAgencies(),
    FavouritesService.getMyFavouriteAgencies
  );
  const favAgency = agencies!.find((a) => a.agency_id === agency.id)!;

  const handleClick = async () => {
    await FavouritesService.unfollowAgency(favAgency.id);
    queryClient.setQueryData<FavouriteAgency[]>(
      queryKeysBuilder.favouriteAgencies(),
      (prev) => prev!.filter((a) => a.id !== favAgency.id)
    );
  };

  return (
    <Tooltip content={`Unfollow ${agency.name}`}>
      <button onClick={handleClick}>
        <FaStar color="yellow" />
      </button>
    </Tooltip>
  );
};

type NotFollowedAgencyProps = { agency: Agency };

const NotFollowedAgency = ({ agency }: NotFollowedAgencyProps) => {
  const queryClient = useQueryClient();

  const handleClick = async () => {
    const newFavAgency = await FavouritesService.followAgency(agency.id);
    queryClient.setQueryData<FavouriteAgency[]>(
      queryKeysBuilder.favouriteAgencies(),
      (prev) => (prev !== undefined ? [...prev, newFavAgency] : [newFavAgency])
    );
  };

  return (
    <Tooltip content={`Follow ${agency.name}`}>
      <button onClick={handleClick}>
        <FaRegStar color="yellow" />
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
