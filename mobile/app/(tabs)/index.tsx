import { FlatList, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { LAUNCHES_QUERY_OPTIONS } from "@/features/launches/api/launches-query-options";
import LaunchCard from "@/features/launches/components/launch-card";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const { data: launches, isPending } = useQuery(
    LAUNCHES_QUERY_OPTIONS.upcoming()
  );

  if (isPending)
    return (
      <ThemedView variant="primary" style={loadingStyles.container}>
        <ThemedText variant="primary">loading...</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView variant="primary" style={styles.container}>
      <ThemedView variant="primary" style={styles.navbar}>
        <ThemedText variant="primary" type="title" style={styles.navbarText}>
          Blastoff
        </ThemedText>
      </ThemedView>
      <FlatList
        data={launches!}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LaunchCard launch={item} />}
      />
    </ThemedView>
  );
}

const loadingStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

const styles = StyleSheet.create({
  navbar: {
    height: 90,
  },
  navbarText: {
    marginTop: 40,
    marginLeft: 20,
  },
  container: {
    paddingTop: 8,
  },
});
