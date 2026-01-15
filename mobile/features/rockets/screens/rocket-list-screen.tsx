import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import TopBar from "@/components/top-bar";
import { useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";
import { ROCKETS_QUERY_OPTIONS } from "../api/rockets-query-options";
import RocketCard from "../components/rocket-card";

const RocketListScreen = () => {
  const { data: rockets, isPending } = useQuery(ROCKETS_QUERY_OPTIONS.all());

  if (isPending)
    return (
      <ThemedView variant="secondary">
        <ThemedText variant="secondary">loading...</ThemedText>
      </ThemedView>
    );

  return (
    <View>
      <TopBar text="Rockets" withGetBackIcon={false} />
      <ThemedView variant="primary">
        <ThemedText variant="secondary">
          <FlatList
            data={rockets!}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item: rocket }) => <RocketCard rocket={rocket} />}
            style={{ width: "100%", paddingTop: 8 }}
          />
        </ThemedText>
      </ThemedView>
    </View>
  );
};

export default RocketListScreen;
