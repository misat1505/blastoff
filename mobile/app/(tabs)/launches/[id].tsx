import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { LAUNCHES_QUERY_OPTIONS } from "@/features/launches/api/launches-query-options";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

const LaunchDetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: launch, isPending } = useQuery(LAUNCHES_QUERY_OPTIONS.byId(id));

  if (isPending)
    return (
      <ThemedView variant="primary" style={loadingStyles.container}>
        <ThemedText variant="primary">loading...</ThemedText>
      </ThemedView>
    );

  if (!launch)
    return (
      <ThemedView variant="primary" style={loadingStyles.container}>
        <ThemedText variant="primary">
          This launch doesn&apos;t exist.
        </ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView variant="primary">
      <ThemedText variant="primary">{JSON.stringify(launch)}</ThemedText>
    </ThemedView>
  );
};

export default LaunchDetailsPage;

const loadingStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
