import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type NotFoundScreenProps = { text: string };

const NotFoundScreen = ({ text }: NotFoundScreenProps) => {
  return (
    <ThemedView variant="secondary" style={styles.container}>
      <ThemedText variant="secondary">{text}</ThemedText>
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

export default NotFoundScreen;
