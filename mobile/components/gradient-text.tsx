import { useColorScheme } from "@/hooks/use-color-scheme";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type GradientTextProps = {
  text: string;
  style?: StyleProp<TextStyle>;
};

const GradientText = ({ text, style }: GradientTextProps) => {
  const theme = useColorScheme() ?? "light";

  return (
    <MaskedView maskElement={<Text style={[styles.text, style]}>{text}</Text>}>
      <LinearGradient
        colors={
          theme === "dark" ? ["#fb923c", "#ef4444"] : ["#f97316", "#dc2626"]
        }
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      >
        <Text style={[styles.text, style]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "transparent",
    fontSize: 30,
    fontWeight: "800",
  },
});

export default GradientText;
