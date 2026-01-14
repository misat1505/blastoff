import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { withAlpha } from "@/utils/with-alpha";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Launch } from "../schemas/launch";
import LaunchCountdown from "./launch-countdown";

type LaunchImageCountdownProps = Pick<
  Launch,
  "image_url" | "date" | "mission_name"
>;

const LaunchImageCountdown = ({
  image_url,
  date,
  mission_name,
}: LaunchImageCountdownProps) => {
  const theme = useColorScheme() ?? "light";

  const fallbackIconColor = Colors[theme].primary.text;
  const overlayColor = withAlpha(Colors[theme].primary.background, 0.6);

  return (
    <View style={styles.container}>
      {image_url ? (
        <Image source={{ uri: image_url }} style={styles.image} />
      ) : (
        <View style={styles.fallback}>
          <Ionicons name="rocket" size={150} color={fallbackIconColor} />
        </View>
      )}
      <View
        style={[styles.countdown_container, { backgroundColor: overlayColor }]}
      >
        <ThemedText
          type="subtitle"
          variant="primary"
          style={{ textAlign: "center" }}
        >
          {mission_name}
        </ThemedText>
        <LaunchCountdown launchDate={date} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 400,
  },
  image: {
    height: 400,
    width: "100%",
  },
  fallback: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  countdown_container: {
    padding: 4,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 4,
  },
});

export default LaunchImageCountdown;
