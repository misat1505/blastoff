import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavouritesService } from "@/services/FavouritesService";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { useQuery, useQueryClient } from "react-query";
import Loading from "../Loading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FavouriteAgency } from "@/types/Agency";
import { AgencyService } from "@/services/AgencyService";
import { Skeleton } from "../ui/skeleton";
import { Button, buttonVariants } from "../ui/button";
import { FavouriteLaunch } from "@/types/Launch";
import { LaunchService } from "@/services/LaunchService";
import { useToast } from "@/hooks/use-toast";
import Tooltip from "../Tooltip";
import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/routes";

const FollowedDisplayer = () => {
  return (
    <div className="my-4 p-2 rounded-md bg-slate-300/40 dark:bg-slate-700/20">
      <Tabs defaultValue="launches" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="launches">Launches</TabsTrigger>
          <TabsTrigger value="agencies">Agencies</TabsTrigger>
        </TabsList>
        <TabsContent value="launches">
          <LaunchesDisplay />
        </TabsContent>
        <TabsContent value="agencies">
          <AgenciesDisplay />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const LaunchesDisplay = () => {
  const { data: launches, isLoading } = useQuery({
    queryFn: FavouritesService.getMyFavouriteLaunches,
    queryKey: queryKeysBuilder.favouriteLaunches(),
  });

  if (isLoading)
    return (
      <div className="w-full h-16 relative">
        <Loading />
      </div>
    );

  if (launches?.length === 0)
    return (
      <p className="text-muted-foreground text-sm my-4 text-center">
        You have no followed launches.
      </p>
    );

  return (
    <Table>
      <TableCaption>A list of your followed launches.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Logo</TableHead>
          <TableHead>Followed since</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {launches?.map((launch) => (
          <LaunchRow key={launch.id} launch={launch} />
        ))}
      </TableBody>
    </Table>
  );
};

type LaunchRowProps = { launch: FavouriteLaunch };

const LaunchRow = ({ launch: fav_launch }: LaunchRowProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: launch, isLoading } = useQuery({
    queryFn: () => LaunchService.getLaunchById(fav_launch.launch_id),
    queryKey: queryKeysBuilder.launch(fav_launch.launch_id),
  });

  const handleUnfollowLaunch = async () => {
    await FavouritesService.unfollowLaunch(fav_launch.id);
    queryClient.setQueryData<FavouriteLaunch[]>(
      queryKeysBuilder.favouriteLaunches(),
      (prev) => {
        if (!prev) return [];
        return prev.filter((a) => a.launch_id !== fav_launch.launch_id);
      }
    );
    toast({
      title: `Unsubscribed from ${launch!.mission_name}`,
      description: `You will no longer receive email notifications about this launch.`,
    });
  };

  if (isLoading || !launch)
    return (
      <TableRow className="hover:bg-inherit">
        <td colSpan={100} className="p-0">
          <Skeleton className="w-[calc(100%-1rem)] h-8 m-2" />
        </td>
      </TableRow>
    );

  return (
    <TableRow>
      <TableCell className="font-medium text-nowrap">
        {launch.mission_name}
      </TableCell>
      <TableCell>
        <img
          src={launch.image_url!}
          alt={`${launch.mission_name} logo`}
          className="max-h-8 max-w-24"
        />
      </TableCell>
      <TableCell>
        {new Date(fav_launch.added_at).toLocaleDateString()}
      </TableCell>
      <TableCell className="text-right">
        <div className="space-x-2">
          <Tooltip content={`${launch.mission_name} details`}>
            <span>
              <Link
                className={buttonVariants({ variant: "secondary" })}
                to={ROUTES.LAUNCH.$buildPath({
                  params: { launchId: launch.id },
                })}
              >
                Details
              </Link>
            </span>
          </Tooltip>
          <Tooltip content={`Unfollow ${launch.mission_name}`}>
            <Button onClick={handleUnfollowLaunch}>Unfollow</Button>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
};

const AgenciesDisplay = () => {
  const { data: agencies, isLoading } = useQuery({
    queryFn: FavouritesService.getMyFavouriteAgencies,
    queryKey: queryKeysBuilder.favouriteAgencies(),
  });

  if (isLoading)
    return (
      <div className="w-full h-16 relative">
        <Loading />
      </div>
    );

  if (agencies?.length === 0)
    return (
      <p className="text-muted-foreground text-sm my-4 text-center">
        You have no followed agencies.
      </p>
    );

  return (
    <Table>
      <TableCaption>A list of your followed agencies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Logo</TableHead>
          <TableHead>Followed since</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agencies?.map((agency) => (
          <AgencyRow key={agency.id} agency={agency} />
        ))}
      </TableBody>
    </Table>
  );
};

type AgencyRowProps = { agency: FavouriteAgency };

const AgencyRow = ({ agency: fav_agency }: AgencyRowProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: agency, isLoading } = useQuery({
    queryFn: () => AgencyService.getAgency(fav_agency.agency_id),
    queryKey: queryKeysBuilder.agency(fav_agency.agency_id),
  });

  const handleUnfollowAgency = async () => {
    await FavouritesService.unfollowAgency(fav_agency.id);
    queryClient.setQueryData<FavouriteAgency[]>(
      queryKeysBuilder.favouriteAgencies(),
      (prev) => {
        if (!prev) return [];
        return prev.filter((a) => a.agency_id !== fav_agency.agency_id);
      }
    );
    toast({
      title: `Unfollowed ${agency!.name}`,
      description: `You will no longer receive notifications about their launches.`,
    });
  };

  if (isLoading || !agency)
    return (
      <TableRow className="hover:bg-inherit">
        <td colSpan={100} className="p-0">
          <Skeleton className="w-[calc(100%-1rem)] h-8 m-2" />
        </td>
      </TableRow>
    );

  return (
    <TableRow>
      <TableCell className="font-medium text-nowrap">{agency.name}</TableCell>
      <TableCell>
        <img
          src={agency.image_url!}
          alt={`${agency.name} logo`}
          className="max-h-8 max-w-24"
        />
      </TableCell>
      <TableCell>
        {new Date(fav_agency.added_at).toLocaleDateString()}
      </TableCell>
      <TableCell className="text-right">
        <Tooltip content={`Unfollow ${agency.name}`}>
          <Button onClick={handleUnfollowAgency}>Unfollow</Button>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default FollowedDisplayer;
