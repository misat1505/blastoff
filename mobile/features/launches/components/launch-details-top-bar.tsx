import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const LaunchDetailsTopBar = () => {
  const theme = useColorScheme() ?? "light";
  const router = useRouter();

  const iconColor = Colors[theme].primary.text;

  return (
    <ThemedView variant="primary" style={styles.navbar}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} style={{ color: iconColor }} />
      </TouchableOpacity>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <ThemedText variant="primary" type="title">
        Blastoff
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 90,
    paddingTop: 40,
    paddingLeft: 20,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
  },
});

export default LaunchDetailsTopBar;
