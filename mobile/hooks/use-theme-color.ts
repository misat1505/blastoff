/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors, ColorVariants } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function useThemeColor(
  props: { variant: ColorVariants },
  key: keyof typeof Colors.light.primary
) {
  const theme = useColorScheme() ?? "light";

  return Colors[theme][props.variant][key];
}
