import { FlatList, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { LAUNCHES_QUERY_OPTIONS } from "@/features/launches/api/launches-query-options";
import LaunchCard from "@/features/launches/components/launch-card";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";

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
    <ThemedView variant="primary" style={styles.container}>
      <ThemedView variant="secondary" style={styles.navbar}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <ThemedText variant="secondary" type="subtitle">
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
};

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
    paddingTop: 40,
    paddingLeft: 20,
    flexDirection: "row",
    marginBottom: 8,
    gap: 8,
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
  },
  container: {
    paddingTop: 8,
  },
});

export default LaunchFeedScreen;
