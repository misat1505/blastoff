import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { TOP_BAR_HEIGHT } from "@/constants/ui";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

type TopBarProps = { text: string; withGetBackIcon?: boolean };

const TopBar = ({ text, withGetBackIcon = true }: TopBarProps) => {
  const theme = useColorScheme() ?? "light";
  const router = useRouter();

  const iconColor = Colors[theme].secondary.text;

  return (
    <ThemedView variant="secondary" style={styles.navbar}>
      {withGetBackIcon ? (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} style={{ color: iconColor }} />
        </TouchableOpacity>
      ) : null}
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <ThemedText
        variant="secondary"
        type="subtitle"
        ellipsizeMode="tail"
        numberOfLines={1}
        style={{ maxWidth: "70%" }}
      >
        {text}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: TOP_BAR_HEIGHT,
    paddingTop: 40,
    paddingLeft: 20,
    paddingBottom: 10,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
  },
});

export default TopBar;
