import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";
import { Launch } from "../schemas/launch";

type GeneralLaunchInfoProps = Pick<
  Launch,
  "description" | "status_name" | "status_description" | "date"
>;

const GeneralLaunchInfo = ({
  description,
  status_name,
  status_description,
  date,
}: GeneralLaunchInfoProps) => {
  const dateStr = `${date.toLocaleDateString()} • ${date.toLocaleTimeString()}`;

  return (
    <ThemedView variant="secondary" style={styles.container}>
      {/* STATUS */}
      <ThemedView variant="secondary" style={styles.statusRow}>
        <ThemedView variant="primary" style={styles.badge}>
          <ThemedText
            type="subtitle"
            variant="primary"
            style={styles.badgeText}
          >
            {status_name}
          </ThemedText>
        </ThemedView>
        <ThemedText
          type="subtitle"
          variant="secondary"
          style={styles.statusDescription}
        >
          {status_description}
        </ThemedText>
      </ThemedView>

      {/* DESCRIPTION */}
      <ThemedText variant="secondary" style={styles.description}>
        {description}
      </ThemedText>

      {/* DATE */}
      <ThemedText variant="secondary" type="subtitle" style={styles.date}>
        {dateStr}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    borderRadius: 16,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  badgeText: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontWeight: "600",
  },
  badge: {
    borderRadius: 8,
  },
  statusDescription: {
    opacity: 0.75,
  },
  description: {
    lineHeight: 22,
  },
  date: {
    opacity: 0.6,
  },
});

export default GeneralLaunchInfo;
