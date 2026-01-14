import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { LAUNCHES_QUERY_OPTIONS } from "@/features/launches/api/launches-query-options";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import LaunchDetailsTopBar from "../components/launch-details-top-bar";
import LaunchImageCountdown from "../components/launch-image-countdown";
import LaunchLoader from "../components/launch-loader";
import LaunchNotFound from "../components/launch-not-found";

const LaunchDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: launch, isPending } = useQuery(LAUNCHES_QUERY_OPTIONS.byId(id));

  if (isPending) return <LaunchLoader />;
  if (!launch) return <LaunchNotFound />;

  return (
    <ThemedView variant="primary">
      <LaunchDetailsTopBar />
      <ScrollView>
        <LaunchImageCountdown
          imageUrl={launch.image_url}
          launchDate={launch.date}
          name={launch.mission_name}
        />
        <ThemedText variant="primary">{JSON.stringify(launch)}</ThemedText>
      </ScrollView>
    </ThemedView>
  );
};

export default LaunchDetailsScreen;
