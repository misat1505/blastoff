import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import useCountdown from "../hooks/useCountdown";
import { Launch } from "../schemas/launch";

type LaunchCountdownProps = Pick<Launch, "date"> & {
  variant?: keyof typeof Colors.dark;
};

const LaunchCountdown = ({
  date,
  variant = "primary",
}: LaunchCountdownProps) => {
  const { days, hours, minutes, seconds } = useCountdown(date);

  const renderBox = (value: number | string) => (
    <ThemedView variant={variant} style={styles.box}>
      <ThemedText variant="secondary" style={styles.boxText}>
        {value.toString().padStart(2, "0")}
      </ThemedText>
    </ThemedView>
  );

  const renderSeparator = () => (
    <ThemedText variant="secondary" style={styles.separator}>
      :
    </ThemedText>
  );

  return (
    <View style={styles.container}>
      {renderBox(days)}
      {renderSeparator()}
      {renderBox(hours)}
      {renderSeparator()}
      {renderBox(minutes)}
      {renderSeparator()}
      {renderBox(seconds)}
    </View>
  );
};

export default LaunchCountdown;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  box: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 2,
  },
  boxText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  separator: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginHorizontal: 2,
  },
});
