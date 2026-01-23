import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Launch } from "../schemas/launch";
import LaunchCountdown from "./launch-countdown";

type LaunchCardProps = { launch: Launch };

const LaunchCard = ({ launch }: LaunchCardProps) => {
  const theme = useColorScheme() ?? "light";

  const fallbackIconColor = Colors[theme].secondary.text;

  return (
    <Link
      href={{ pathname: "/(tabs)/launches/[id]", params: { id: launch.id } }}
      style={styles.link}
    >
      <ThemedView variant="secondary" style={styles.card}>
        {launch.image_url ? (
          <Image
            source={{ uri: launch.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, styles.image_fallback]}>
            <Ionicons name="rocket" size={80} color={fallbackIconColor} />
          </View>
        )}
        <ThemedView variant="secondary" style={styles.info}>
          <ThemedText
            variant="primary"
            type="title"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {launch.mission_name}
          </ThemedText>
          <LaunchCountdown date={launch.date} />

          <View style={styles.row}>
            <Icon name="map-marker" size={20} color="#888" />
            <ThemedText
              variant="secondary"
              style={styles.iconText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {launch.site?.name}
            </ThemedText>
          </View>

          <View style={styles.row}>
            <Icon name="rocket" size={20} color="#888" />
            <ThemedText
              variant="secondary"
              style={styles.iconText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {launch.rocket.name}
            </ThemedText>
          </View>
        </ThemedView>
      </ThemedView>
    </Link>
  );
};

export default LaunchCard;

const styles = StyleSheet.create({
  link: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
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
  image_fallback: { justifyContent: "center", alignItems: "center" },
  info: {
    width: "70%",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "center",
    padding: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  iconText: {
    marginLeft: 4,
  },
});
