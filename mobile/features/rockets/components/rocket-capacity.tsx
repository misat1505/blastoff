import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";
import { Rocket } from "../shemas/rocket";

type RocketCapacityProps = Pick<
  Rocket,
  "leo_capacity" | "geo_capacity" | "gto_capacity" | "sso_capacity"
>;

const CapacityItem = ({
  label,
  value,
}: {
  label: string;
  value: number | null | undefined;
}) => (
  <ThemedView variant="primary" style={styles.item}>
    <ThemedText variant="secondary" style={styles.label}>
      {label}
    </ThemedText>
    <ThemedText variant="primary" style={styles.value}>
      {value != null ? `${value.toLocaleString()} kg` : "—"}
    </ThemedText>
  </ThemedView>
);

const RocketCapacity = ({
  leo_capacity,
  geo_capacity,
  gto_capacity,
  sso_capacity,
}: RocketCapacityProps) => {
  return (
    <ThemedView variant="primary" style={styles.container}>
      <CapacityItem label="LEO" value={leo_capacity} />
      <CapacityItem label="GTO" value={gto_capacity} />
      <CapacityItem label="GEO" value={geo_capacity} />
      <CapacityItem label="SSO" value={sso_capacity} />
    </ThemedView>
  );
};

export default RocketCapacity;

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
  value: {
    fontSize: 28,
    fontWeight: 600,
  },
});
