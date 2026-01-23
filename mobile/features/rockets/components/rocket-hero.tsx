import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TOP_BAR_HEIGHT } from "@/constants/ui";
import { Image } from "expo-image";
import { Dimensions, StyleSheet, View } from "react-native";
import { Rocket } from "../shemas/rocket";

type RocketHeroProps = Pick<Rocket, "image_url" | "name">;

const RocketHero = ({ image_url, name }: RocketHeroProps) => {
  return (
    <View style={styles.rocket_image}>
      {image_url ? (
        <Image source={{ uri: image_url }} style={styles.rocket_image} />
      ) : null}
      <ThemedView variant="secondary" style={styles.rocket_name}>
        <ThemedText variant="secondary" type="title">
          {name}
        </ThemedText>
      </ThemedView>
    </View>
  );
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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
    maxWidth: "80%",
  },
});

export default RocketHero;
