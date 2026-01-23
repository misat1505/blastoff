import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet, Text, View } from "react-native";
import { Rocket } from "../shemas/rocket";

type RocketLaunchesProps = Pick<
  Rocket,
  | "launches_count"
  | "successful_launches_count"
  | "failed_launches_count"
  | "pending_launches"
>;

const LaunchStat = ({
  label,
  value,
  variant,
}: {
  label: string;
  value: number | null | undefined;
  variant?: "success" | "error" | "warning";
}) => (
  <View style={styles.item}>
    <ThemedText variant="secondary" style={styles.label}>
      {label}
    </ThemedText>
    {variant ? (
      <Text
        style={[
          variant === "success"
            ? styles.success
            : variant === "error"
              ? styles.error
              : variant === "warning"
                ? styles.warning
                : undefined,
          styles.value,
        ]}
      >
        {value ?? "—"}
      </Text>
    ) : (
      <ThemedText variant="secondary" style={[styles.value, { marginTop: 10 }]}>
        {value ?? "—"}
      </ThemedText>
    )}
  </View>
);

const RocketLaunches = ({
  launches_count,
  successful_launches_count,
  failed_launches_count,
  pending_launches,
}: RocketLaunchesProps) => {
  return (
    <ThemedView variant="secondary" style={styles.container}>
      <LaunchStat label="Total launches" value={launches_count} />
      <LaunchStat
        label="Successful"
        value={successful_launches_count}
        variant="success"
      />
      <LaunchStat
        label="Failed"
        value={failed_launches_count}
        variant="error"
      />
      <LaunchStat label="Pending" value={pending_launches} variant="warning" />
    </ThemedView>
  );
};

export default RocketLaunches;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    padding: 16,
  },
  item: {
    width: "47%",
    gap: 4,
  },
  label: {
    opacity: 0.7,
  },
  success: {
    color: "#4caf50",
  },
  error: {
    color: "#f44336",
  },
  warning: {
    color: "#ff9800",
  },
  value: {
    fontSize: 28,
    fontWeight: 600,
  },
});
