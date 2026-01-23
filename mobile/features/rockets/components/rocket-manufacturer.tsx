import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { Image, Linking, Pressable, StyleSheet, Text } from "react-native";
import { Agency } from "../shemas/rocket";

type RocketManufacturerProps = { agency: Agency };

const RocketManufacturer = ({ agency }: RocketManufacturerProps) => {
  const [expanded, setExpanded] = useState(false);

  const openWebsite = () => {
    if (agency.website) {
      Linking.openURL(agency.website);
    }
  };

  return (
    <ThemedView variant="secondary" style={styles.container}>
      {agency.image_url && (
        <Image
          source={{ uri: agency.image_url }}
          style={styles.logo}
          resizeMode="contain"
        />
      )}

      <ThemedView variant="secondary" style={styles.content}>
        <ThemedText variant="secondary" type="title">
          {agency.name ?? "Unknown manufacturer"}
        </ThemedText>

        {agency.country && (
          <ThemedText variant="secondary">{agency.country}</ThemedText>
        )}

        {agency.description && (
          <>
            <ThemedText
              variant="secondary"
              style={styles.description}
              numberOfLines={expanded ? undefined : 3}
            >
              {agency.description}
            </ThemedText>

            <Pressable onPress={() => setExpanded((v) => !v)}>
              <Text style={styles.expand}>
                {expanded ? "Show less" : "Read more"}
              </Text>
            </Pressable>
          </>
        )}

        {agency.website && (
          <Pressable onPress={openWebsite}>
            <Text style={styles.link}>Visit website</Text>
          </Pressable>
        )}
      </ThemedView>
    </ThemedView>
  );
};

export default RocketManufacturer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    padding: 16,
  },
  logo: {
    width: 64,
    height: 64,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  description: {
    marginTop: 4,
    opacity: 0.85,
  },
  expand: {
    marginTop: 4,
    color: "#4da3ff",
    fontSize: 13,
  },
  link: {
    marginTop: 8,
    color: "#4da3ff",
  },
});
