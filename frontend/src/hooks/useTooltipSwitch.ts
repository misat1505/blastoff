import { useLocalStorage } from "usehooks-ts";

export function useTooltipSwitch() {
  return useLocalStorage<boolean>("showTooltips", true);
}
