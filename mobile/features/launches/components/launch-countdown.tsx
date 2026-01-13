import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { StyleSheet, View } from "react-native";
import useCountdown from "../hooks/useCountdown";

const LaunchCountdown = ({ launchDate }: { launchDate: Date }) => {
  const { days, hours, minutes, seconds } = useCountdown(launchDate);

  const renderBox = (value: number | string) => (
    <ThemedView variant="primary" style={styles.box}>
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
