import { FlatList, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { LAUNCHES_QUERY_OPTIONS } from "@/features/launches/api/launches-query-options";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const { data: launches, isPending } = useQuery(
    LAUNCHES_QUERY_OPTIONS.upcoming()
  );

  if (isPending)
    return (
      <ThemedView>
        <ThemedText>loading...</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView>
      <FlatList
        data={launches!}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ThemedText>{item.mission_name}</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
