import { useColorScheme, View, type ViewProps } from "react-native";

import { ColorVariants } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant: ColorVariants;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  variant,
  ...otherProps
}: ThemedViewProps) {
  const theme = useColorScheme() ?? "light";
  const backgroundColor = useThemeColor({ variant }, "background");

  function getColor() {
    if (lightColor && theme === "light") return lightColor;
    if (darkColor && theme === "dark") return darkColor;
    return backgroundColor;
  }

  return (
    <View style={[{ backgroundColor: getColor() }, style]} {...otherProps} />
  );
}
