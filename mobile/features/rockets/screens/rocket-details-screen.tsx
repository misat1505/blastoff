import LoadingScreen from "@/components/loading-screen";
import NotFoundScreen from "@/components/not-found-screen";
import { ThemedText } from "@/components/themed-text";
import TopBar from "@/components/top-bar";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { ROCKETS_QUERY_OPTIONS } from "../api/rockets-query-options";
import RocketHero from "../components/rocket-hero";

const RocketDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: rocket, isPending } = useQuery(
    ROCKETS_QUERY_OPTIONS.byId(Number(id)),
  );

  if (isPending) return <LoadingScreen />;
  if (!rocket) return <NotFoundScreen text="This rocket doesn't exist." />;

  return (
    <View>
      <TopBar text={rocket.name} />
      <ScrollView>
        <RocketHero {...rocket} />
        <ThemedText variant="secondary">{JSON.stringify(rocket)}</ThemedText>
      </ScrollView>
    </View>
  );
};

export default RocketDetailsScreen;
