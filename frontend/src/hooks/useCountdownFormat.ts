import { useLocalStorage } from "usehooks-ts";

export function useCountdownFormat() {
  return useLocalStorage<boolean>("simplifiedCountdown", false);
}
