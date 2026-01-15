import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Launch } from "../schemas/launch";

type LaunchVehicleInfoProps = Pick<Launch, "rocket">;

const LaunchVehicleInfo = ({ rocket }: LaunchVehicleInfoProps) => {
  const router = useRouter();

  const goToRocketDetails = () => {
    router.push({
      pathname: "/(tabs)/rockets/[id]",
      params: { id: rocket.id },
    });
  };

  return (
    <Pressable onPress={goToRocketDetails}>
      {({ pressed }) => (
        <ThemedView
          variant="secondary"
          style={[styles.container, pressed && styles.pressed]}
        >
          <View style={styles.header}>
            <View style={styles.textBlock}>
              <ThemedText type="subtitle" variant="secondary">
                {rocket.name}
              </ThemedText>
              <ThemedText variant="secondary" style={styles.agency}>
                {rocket.agency.name}
              </ThemedText>
            </View>

            {rocket.image_url ? (
              <Image source={{ uri: rocket.image_url }} style={styles.image} />
            ) : null}
          </View>

          <ThemedText variant="secondary" type="link" style={styles.hint}>
            View rocket details
          </ThemedText>
        </ThemedView>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    gap: 12,
  },
  pressed: {
    opacity: 0.85,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  image: {
    height: 100,
    width: 200,
    borderRadius: 16,
  },
  textBlock: {
    flex: 1,
  },
  agency: {
    opacity: 0.7,
  },
  chevron: {
    opacity: 0.5,
  },
  hint: {
    opacity: 0.6,
  },
});

export default LaunchVehicleInfo;
