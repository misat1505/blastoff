import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image, StyleSheet } from "react-native";
import { Launch } from "../schemas/launch";

type LaunchCardProps = { launch: Launch };

const LaunchCard = ({ launch }: LaunchCardProps) => {
  return (
    <ThemedView style={styles.card}>
      {launch.image_url && (
        <Image
          source={{ uri: launch.image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <ThemedView style={styles.info}>
        <ThemedText style={styles.title}>{launch.mission_name}</ThemedText>
        <ThemedText style={styles.title}>
          Liftoff: {launch.date.toLocaleDateString()}{" "}
          {launch.date.toLocaleTimeString()}
        </ThemedText>
        <ThemedText style={styles.title}>{launch.site?.name}</ThemedText>
        <ThemedText style={styles.title}>{launch.rocket.name}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default LaunchCard;

const styles = StyleSheet.create({
  card: {
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
    color: "white",
  },
});
