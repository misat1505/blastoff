import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Launch, Site } from "../schemas/launch";

type LaunchSiteInfoProps = Pick<Launch, "mission_name"> & { site: Site };

const LaunchSiteInfo = ({ mission_name, site }: LaunchSiteInfoProps) => {
  return (
    <ThemedView variant="secondary" style={styles.container}>
      <ThemedText variant="secondary" style={styles.text}>
        <ThemedText type="subtitle" variant="secondary">
          {mission_name}
        </ThemedText>{" "}
        is scheduled for liftoff at{" "}
        <ThemedText type="subtitle" variant="secondary">
          {site.name}
        </ThemedText>
      </ThemedText>

      {site.map_image_url ? (
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: site.map_image_url }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        </View>
      ) : null}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    marginTop: 16,
  },
  text: {
    lineHeight: 22,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 260,
  },
});

export default LaunchSiteInfo;
