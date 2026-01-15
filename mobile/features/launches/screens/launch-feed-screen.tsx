import { FlatList, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import TopBar from "@/components/top-bar";
import { LAUNCHES_QUERY_OPTIONS } from "@/features/launches/api/launches-query-options";
import LaunchCard from "@/features/launches/components/launch-card";
import { useQuery } from "@tanstack/react-query";

const LaunchFeedScreen = () => {
  const { data: launches, isPending } = useQuery(
    LAUNCHES_QUERY_OPTIONS.upcoming()
  );

  if (isPending)
    return (
      <ThemedView variant="secondary" style={loadingStyles.container}>
        <ThemedText variant="secondary">loading...</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView variant="primary">
      <TopBar text="Blastoff" withGetBackIcon={false} />
      <FlatList
        data={launches!}
        style={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LaunchCard launch={item} />}
      />
    </ThemedView>
  );
};

const loadingStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
  },
  logo: {
    width: 32,
    height: 32,
  },
});

export default LaunchFeedScreen;
