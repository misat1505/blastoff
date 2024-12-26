import { Agency, FavouriteAgency } from "@/types/Agency";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useQueryClient } from "react-query";
import Tooltip from "./Tooltip";

type FavouriteAgencyDisplayProps = {
  agency: Agency;
};

const FavouriteAgencyDisplay = ({ agency }: FavouriteAgencyDisplayProps) => {
  const queryClient = useQueryClient();

  const agencies = queryClient.getQueryData<FavouriteAgency[]>(
    queryKeysBuilder.favouriteAgencies()
  );

  if (agencies === undefined) return <DisabledStar />;

  const isFavourite = agencies.some((a) => a.agency_id === agency.id);

  if (!isFavourite) return <NotFollowedAgency agency={agency} />;

  return <FollowedAgency agency={agency} />;
};

type FollowedAgencyProps = { agency: Agency };

const FollowedAgency = ({ agency }: FollowedAgencyProps) => {
  return (
    <Tooltip content={`Unfollow ${agency.name}`}>
      <button onClick={() => console.log(`Clicked ${agency.id}`)}>
        <FaStar color="yellow" />
      </button>
    </Tooltip>
  );
};

type NotFollowedAgencyProps = { agency: Agency };

const NotFollowedAgency = ({ agency }: NotFollowedAgencyProps) => {
  return (
    <Tooltip content={`Follow ${agency.name}`}>
      <button onClick={() => console.log(`Clicked ${agency.id}`)}>
        <FaRegStar color="yellow" />
      </button>
    </Tooltip>
  );
};

type DisabledStarProps = {};

const DisabledStar = ({}: DisabledStarProps) => {
  return (
    <Tooltip content="Log in to use this feature.">
      <button disabled className="hover:cursor-not-allowed">
        <FaRegStar />
      </button>
    </Tooltip>
  );
};

export default FavouriteAgencyDisplay;
