import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image, StyleSheet } from "react-native";
import { Launch } from "../schemas/launch";

type LaunchCardProps = { launch: Launch };

const LaunchCard = ({ launch }: LaunchCardProps) => {
  return (
    <ThemedView variant="secondary" style={styles.card}>
      {launch.image_url && (
        <Image
          source={{ uri: launch.image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <ThemedView variant="secondary" style={styles.info}>
        <ThemedText variant="primary" type="title" style={styles.title}>
          {launch.mission_name}
        </ThemedText>
        <ThemedText variant="secondary">
          Liftoff: {launch.date.toLocaleDateString()}{" "}
          {launch.date.toLocaleTimeString()}
        </ThemedText>
        <ThemedText variant="secondary">{launch.site?.name}</ThemedText>
        <ThemedText variant="secondary">{launch.rocket.name}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default LaunchCard;

const styles = StyleSheet.create({
  card: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
    padding: 8,
    flexDirection: "row",
  },
  image: {
    width: "30%",
    height: 300,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  info: {
    flexGrow: 1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
