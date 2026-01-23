import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";
import { Rocket } from "../shemas/rocket";

type RocketDimensionsProps = Pick<
  Rocket,
  "diameter" | "height" | "mass" | "no_stages" | "rocket_thrust" | "launch_cost"
>;

const StatItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <ThemedView variant="primary" style={styles.statItem}>
    <ThemedText variant="secondary" style={styles.label}>
      {label}
    </ThemedText>
    <ThemedText numberOfLines={1} variant="primary" style={styles.value}>
      {value ?? "—"}
    </ThemedText>
  </ThemedView>
);

const RocketDimensions = ({
  diameter,
  height,
  mass,
  no_stages,
  rocket_thrust,
  launch_cost,
}: RocketDimensionsProps) => {
  return (
    <ThemedView variant="primary" style={styles.container}>
      <StatItem label="Height" value={height ? `${height} m` : null} />
      <StatItem label="Diameter" value={diameter ? `${diameter} m` : null} />
      <StatItem label="Mass" value={mass ? `${mass} kg` : null} />
      <StatItem label="Stages" value={no_stages} />
      <StatItem
        label="Thrust at liftoff"
        value={rocket_thrust ? `${rocket_thrust} kN` : null}
      />
      <StatItem
        label="Launch cost"
        value={launch_cost ? `${launch_cost.toLocaleString()} $` : null}
      />
    </ThemedView>
  );
};

export default RocketDimensions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    padding: 16,
  },
  statItem: {
    width: "47%",
    gap: 4,
  },
  label: {
    opacity: 0.7,
  },
  value: {
    fontSize: 28,
    fontWeight: 600,
  },
});
