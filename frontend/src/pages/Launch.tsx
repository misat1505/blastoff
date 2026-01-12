import Error from "@/components/Error";
import CommentSection from "@/components/launch/CommentSection";
import LaunchHeader from "@/components/launch/LaunchHeader";
import LaunchInfo from "@/components/launch/LaunchInfo";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import CommentSectionProvider from "@/context/CommentSectionContext";
import LaunchProvider from "@/context/LaunchContext";
import { LaunchService } from "@/services/LaunchService";
import { Launch } from "@/types/Launch";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const LaunchPage = () => {
  const { launchId } = useParams();

  if (!launchId)
    return (
      <NotFound
        title="Launch not found"
        text="Launch id has to be provided. Check your URL."
      />
    );

  return <LaunchPageContent id={launchId} />;
};

export default LaunchPage;

type LaunchPageContentProps = {
  id: Launch["id"];
};

const LaunchPageContent = ({ id }: LaunchPageContentProps) => {
  const {
    data: launch,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryFn: () => LaunchService.getLaunchById(id),
    queryKey: queryKeysBuilder.launch(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  if (error)
    return (
      <Error
        title="Error fetching launch"
        description={JSON.stringify(error)}
        handleRefresh={refetch}
      />
    );

  if (!launch)
    return (
      <NotFound
        title="Launch not found"
        text="Launch of given ID doesn't exist."
      />
    );

  return (
    <div className="mx-auto w-full px-4 pb-4 lg:w-1/2 lg:px-0">
      <LaunchProvider launch={launch}>
        <LaunchHeader />
        <LaunchInfo />
        <CommentSectionProvider launchId={id}>
          <CommentSection />
        </CommentSectionProvider>
      </LaunchProvider>
    </div>
  );
};
