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
      <ThemedText style={styles.title}>{launch.mission_name}</ThemedText>
    </ThemedView>
  );
};

export default LaunchCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
