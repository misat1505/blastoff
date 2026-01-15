import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import TopBar from "@/components/top-bar";
import { TOP_BAR_HEIGHT } from "@/constants/ui";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { ROCKETS_QUERY_OPTIONS } from "../api/rockets-query-options";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const RocketDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: rocket, isPending } = useQuery(
    ROCKETS_QUERY_OPTIONS.byId(Number(id))
  );

  if (isPending)
    return (
      <ThemedView variant="secondary">
        <ThemedText variant="secondary">loading...</ThemedText>
      </ThemedView>
    );

  if (!rocket)
    return (
      <ThemedView variant="secondary">
        <ThemedText variant="secondary">
          this rocket doesn&apos;t exist
        </ThemedText>
      </ThemedView>
    );

  return (
    <View>
      <TopBar text={rocket.name} />
      <ScrollView>
        <View style={styles.rocket_image}>
          {rocket.image_url ? (
            <Image
              source={{ uri: rocket.image_url }}
              style={styles.rocket_image}
            />
          ) : null}
          <ThemedView variant="secondary" style={styles.rocket_name}>
            <ThemedText variant="secondary" type="title">
              {rocket.name}
            </ThemedText>
          </ThemedView>
        </View>
        <ThemedText variant="secondary">{JSON.stringify(rocket)}</ThemedText>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rocket_image: {
    width: "100%",
    height: SCREEN_HEIGHT - TOP_BAR_HEIGHT,
  },
  image_container: {
    position: "relative",
  },
  rocket_name: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 8,
    borderRadius: 8,
  },
});

export default RocketDetailsScreen;
