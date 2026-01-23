import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet, Text, View } from "react-native";
import { Rocket } from "../shemas/rocket";

type RocketRecoveriesProps = Pick<
  Rocket,
  "landings_count" | "failed_landings_count" | "successful_landings_count"
> & {
  recoveryVariant: "landing" | "catch";
};

const RecoveryStat = ({
  label,
  value,
  variant,
}: {
  label: string;
  value: number | string | null | undefined;
  variant?: "success" | "error";
}) => (
  <View style={styles.item}>
    <ThemedText variant="primary" style={styles.label}>
      {label}
    </ThemedText>
    {variant ? (
      <Text
        style={[
          variant === "success"
            ? styles.success
            : variant === "error"
              ? styles.error
              : undefined,
          styles.value,
        ]}
      >
        {value ?? "—"}
      </Text>
    ) : (
      <ThemedText variant="primary" style={[styles.value, { marginTop: 10 }]}>
        {value ?? "—"}
      </ThemedText>
    )}
  </View>
);

const RocketRecoveries = ({
  landings_count,
  successful_landings_count,
  failed_landings_count,
  recoveryVariant,
}: RocketRecoveriesProps) => {
  const variantLabel = recoveryVariant === "catch" ? "Catch" : "Landing";

  return (
    <ThemedView variant="primary" style={styles.container}>
      <RecoveryStat label="Variant" value={variantLabel} />
      <RecoveryStat label={`Total ${variantLabel}s`} value={landings_count} />
      <RecoveryStat
        label={`Successful ${variantLabel}s`}
        value={successful_landings_count}
        variant="success"
      />
      <RecoveryStat
        label={`Failed ${variantLabel}s`}
        value={failed_landings_count}
        variant="error"
      />
    </ThemedView>
  );
};

export default RocketRecoveries;

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
  value: {
    fontSize: 28,
    fontWeight: 600,
  },
});
