import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useLocalSearchParams } from "expo-router";

const LaunchDetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ThemedView variant="primary">
      <ThemedText variant="primary">Launch ID: {id}</ThemedText>
    </ThemedView>
  );
};

export default LaunchDetailsPage;
