import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { RocketCore } from "../shemas/rocket";

type RocketCardProps = { rocket: RocketCore };

const RocketCard = ({ rocket }: RocketCardProps) => {
  const router = useRouter();

  const redirectToRocketDetails = () => {
    router.push({
      pathname: "/(tabs)/rockets/[id]",
      params: { id: rocket.id },
    });
  };

  return (
    <Pressable onPress={redirectToRocketDetails} style={styles.pressable}>
      <ThemedView variant="secondary" style={styles.card}>
        {rocket.image_url && (
          <Image
            source={{ uri: rocket.image_url }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        )}

        <View style={styles.content}>
          <ThemedText variant="primary" style={styles.title}>
            {rocket.name}
          </ThemedText>

          {rocket.launches_count != null && (
            <ThemedText variant="secondary" style={styles.meta}>
              Launches: {rocket.launches_count}
            </ThemedText>
          )}
        </View>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 8,
    marginBottom: 8,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#000",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  meta: {
    marginTop: 4,
    opacity: 0.7,
  },
});

export default RocketCard;
