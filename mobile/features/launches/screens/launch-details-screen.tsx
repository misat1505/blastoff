import LoadingScreen from "@/components/loading-screen";
import NotFoundScreen from "@/components/not-found-screen";
import { ThemedView } from "@/components/themed-view";
import TopBar from "@/components/top-bar";
import { LAUNCHES_QUERY_OPTIONS } from "@/features/launches/api/launches-query-options";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import GeneralLaunchInfo from "../components/general-launch-info";
import LaunchImageCountdown from "../components/launch-image-countdown";
import LaunchSiteInfo from "../components/launch-site-info";
import LaunchVehicleInfo from "../components/launch-vehicle-info";

const LaunchDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: launch, isPending } = useQuery(LAUNCHES_QUERY_OPTIONS.byId(id));

  if (isPending) return <LoadingScreen />;
  if (!launch) return <NotFoundScreen text="This launch doesn't exist." />;

  return (
    <ThemedView variant="primary">
      <TopBar text={launch.mission_name ?? "Blastoff"} />
      <ScrollView>
        <LaunchImageCountdown {...launch} />
        <GeneralLaunchInfo {...launch} />
        {launch.site ? <LaunchSiteInfo {...launch} site={launch.site} /> : null}
        <LaunchVehicleInfo rocket={launch.rocket} />
        <View style={{ height: 80 }}></View>
      </ScrollView>
    </ThemedView>
  );
};

export default LaunchDetailsScreen;
