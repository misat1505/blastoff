import { ThemedView } from "@/components/themed-view";
import TopBar from "@/components/top-bar";
import { LAUNCHES_QUERY_OPTIONS } from "@/features/launches/api/launches-query-options";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import GeneralLaunchInfo from "../components/general-launch-info";
import LaunchImageCountdown from "../components/launch-image-countdown";
import LaunchLoader from "../components/launch-loader";
import LaunchNotFound from "../components/launch-not-found";
import LaunchSiteInfo from "../components/launch-site-info";
import LaunchVehicleInfo from "../components/launch-vehicle-info";

const LaunchDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: launch, isPending } = useQuery(LAUNCHES_QUERY_OPTIONS.byId(id));

  if (isPending) return <LaunchLoader />;
  if (!launch) return <LaunchNotFound />;

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
