import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

const LaunchLoader = () => {
  return (
    <ThemedView variant="secondary" style={styles.container}>
      <ThemedText variant="secondary">loading...</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default LaunchLoader;
